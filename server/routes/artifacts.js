// Uploads
import express from 'express'
import { Op, Sequelize } from 'sequelize';
import multer from 'multer';
import fs from 'fs';
import config from 'config';
import { v4 as uuidv4 } from 'uuid';
import wrapper from "../lib/route_wrapper.js"
import Artifact from '../models/Artifact.js'
import { detectAndTranslate } from '../lib/translate.js'
import ArtifactUpload from "../models/ArtifactUpload.js"
import ArtifactCritique from "../models/ArtifactCritique.js"
import Selection from '../models/Selection.js'
import { auth, addAuthor } from '../middleware/account.js'
import { task } from '../middleware/tasks.js'
import initDb from "../lib/db.js";


import { UnauthorizedError, NotFoundError } from "../lib/errors.js"
import Task from '../models/Task.js';

const { db } = initDb();

const router = express.Router();

const upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, config.get('uploadDir'));
        },
        filename: function (req, file, cb) {
            cb(null, file.originalname);
        }
    }),
    limits: { fileSize: 10000000 }
});



const moveFile = (from, to) => {
    return new Promise((resolve, reject) => {
        fs.rename(from, to, err => {
            if (err) return reject(err);
            resolve(true);
        });
    });
};


router.post('/', auth, addAuthor, task, wrapper(req => {

    const { task } = req;
    const { user } = req.session;
    const artifacts = Array.isArray(req.body) ? req.body : [req.body];

    const ctx = {};

    // add 
    artifacts.map(artifact => {
        artifact.kind = task.kind;
        artifact.ProjectId = task.ProjectId;
        artifact.ParticipantId = user;
        artifact.TaskId = task.id;
        if (task.ArtifactId) artifact.parentId = task.ArtifactId;
    });

    return Artifact.bulkCreate(artifacts, {
        returning: true,
        individualHooks: true,
    })
        .then(artifacts => {
            ctx.artifact = artifacts[0];
            task.set({
                status: 'done',
            });
            return task.save()
        })
        .then(() => ctx)
}));

router.get('/', auth, wrapper(req => {
    const { translateTo, TaskBlockId, active, selected } = req.query;

    const where = {}
    where.active = 1;
    if (active) where.active = active;

    const taskWhere = {}
    if (TaskBlockId) taskWhere.TaskBlockId = TaskBlockId;



    return Artifact.findAll({
        include: [
            ArtifactUpload,
            ArtifactCritique,
            {
                model: Artifact,
                required: false,
                as: 'parent',
                include: [
                    {
                        model: ArtifactUpload,
                        required: false,
                    }]
            },
            {
                model: Selection,
                required: false,
                where: {
                    ParticipantId: {
                        [Op.ne]: Sequelize.col('Artifact.ParticipantId')
                    }
                }
            },

            {
                model: Task,
                required: false,
                where: taskWhere
            }],
        where
    })
        .then(artifactsRaw => {

            let artifacts = artifactsRaw
            if (selected) {
                artifacts = artifactsRaw.reduce((acc, item) => {
                    if (item.Selections.length)
                        acc.push(item)
                    return acc
                }, [])

                artifacts.sort((a, b) => b.Selections.length - a.Selections.length)
            }

            if (!translateTo) {
                return artifacts
            }

            const promises = artifacts.map(artifact =>
                detectAndTranslate(artifact.description, translateTo)
                    .then(newText => {
                        artifact.description = newText
                        return artifact;
                    })
                    .then(artifact => {
                        const critPromises = artifact.ArtifactCritiques.map(crit =>
                            detectAndTranslate(crit.description, translateTo)
                                .then(newCrit => {
                                    console.log(newCrit)
                                    crit.description = newCrit;
                                    return crit
                                })
                        )
                        return Promise.all(critPromises)
                            .then(() => artifact)
                    })
            )


            return Promise.all(promises)
        })

}))

router.get('/:artifactId', auth, wrapper(req => {
    const { translateTo } = req.query;
    const { artifactId } = req.params;

    return Artifact.findAll({
        include: [
            {
                model: ArtifactUpload,
                required: false,
            },  
            {
                model: ArtifactCritique,
                required: false,
            },   
            {
                model: Artifact,
                required: false,
                as: 'parent',
                include: [
                    {
                        model: ArtifactUpload,
                        required: false,
                    }]
            },    
        ],
        where: {
            id: artifactId,
        },
        limit: 1,
    })
        .then(rows => rows[0])
        .then(artifact => {
            if (!translateTo) {
                return artifact
            }
            const critPromises = artifact.ArtifactCritiques ?
                artifact.ArtifactCritiques.map(crit =>
                detectAndTranslate(crit.description, translateTo)
                    .then(newCrit => {
                        console.log(newCrit)
                        crit.description = newCrit;
                        return crit
                    })
            )
            : [Promise.resolve()]
            return Promise.all(critPromises)
                .then(() => artifact)
        })


}))
router.get('/:artifactId/hirarchy', auth, wrapper(req => {
    const { artifactId } = req.params;
    const ctx = {};
    return Artifact.findByPk(artifactId, {
        include: [ArtifactUpload, ArtifactCritique],
        limit: 1,
    })
        .then(artifact => {
            ctx.artifact = artifact;
            if (!artifact.parentId) {
                return Promise.resolve();
            }
            return Artifact.findByPk(artifact.parentId, {
                include: [ArtifactUpload],
            });
        })
        .then(parent => {
            ctx.parent = parent;
            return ctx;
        });
}))

router.post('/upload/', auth, addAuthor, upload.single('file'), wrapper(req => {
    const {
        file,
        body: { ArtifactId = null },
        session,
    } = req;
    const uuid = uuidv4()
    const ext = file.originalname.split('.').pop();
    const finalPath = `${file.destination}/${uuid}.${ext}`;

    return moveFile(file.path, finalPath).then(() =>
        ArtifactUpload.create({
            ArtifactId,
            file: finalPath,
            ParticipantId: session.user,
        }),
    );
}));


router.delete('/upload/', auth, wrapper(req => {
    const { id } = req.body;

    return ArtifactUpload.findByPk(id)
        .then(artifactUpload => {
            if (!artifactUpload) {
                throw new NotFoundError('ArtifactUpload does not exist');
            }
            if (artifactUpload.ParticipantId != req.session.user) {
                throw new UnauthorizedError(
                    'Not authorized to remove this ArtifactUpload',
                );
            }
            return artifactUpload.destroy();
        });
}));

router.get('/upload', auth, (req, res, next) => {
    const { query: { load } } = req;

    const src = fs.createReadStream(load);
    src.pipe(res);
});

router.patch('/upload/:id', auth, wrapper(req => {
    const { body, params: { id } } = req;
    return ArtifactUpload.findByPk(id)
        .then(upload => upload.update(body));
}));

router.post('/select/', auth, task, wrapper(req => {
    const { body, task } = req;
    const { user } = req.session;


    const ctx = {};
    return Selection.destroy({
        where: {
            ProjectId: task.ProjectId,
            ParticipantId: user,
            TaskBlockId: task.TaskBlockId,
        },
    })
        .then(destroyed => Promise.all(
            body.checked.map(ArtifactId =>
                Selection.create({
                    ParticipantId: user,
                    ProjectId: task.ProjectId,
                    ArtifactId,
                    TaskBlockId: task.TaskBlockId
                }),
            ),
        ))
        .then(sets => {
            ctx.sets = sets;
        })
        .then(() => ctx);
}));


export default router