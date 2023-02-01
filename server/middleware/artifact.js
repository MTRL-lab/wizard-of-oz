const config = require('config');
const artifactKinds = config.get('artifactKinds');

const requestWrapper = require('../lib/requestWrapper');
const {
    UnauthorizedError,
    BadRequestError,
    NotFoundError,
} = require('../lib/errors');
const taskGenerator = require('../lib/taskGenerator');
const {
    Sequelize,
    Artifact,
    Task,
    AccountPayment,
    ArtifactUpload,
    ArtifactCritique,
    RequirementCritique,
    SetArtifact,
    Account,
} = require('../models');

const getArtifact = requestWrapper(req => {
    const {artifactId} = req.params;

    return Artifact.findAll({
        include: [ArtifactUpload, ArtifactCritique],
        where: {
            id: artifactId,
        },
        limit: 1,
    });
});

const getArtifactHirarchy = requestWrapper(req => {
    const {artifactId} = req.params;
    const ctx = {};
    return Artifact.findById(artifactId, {
        include: [ArtifactUpload, ArtifactCritique],
        limit: 1,
    })
        .then(artifact => {
            ctx.artifact = artifact;
            if (!artifact.get('parentId')) {
                return Promise.resolve();
            }
            return Artifact.findById(artifact.get('parentId'), {
                include: [ArtifactUpload],
            });
        })
        .then(parent => {
            ctx.parent = parent;
            return ctx;
        });
});

const getArtifactBlocks = requestWrapper(req => {
    const where = Object.assign({}, req.query);
    return Artifact.findAll({
        where,
        include: [ArtifactUpload, ArtifactCritique, RequirementCritique, Task],
    }).then(artifacts => {
        const artifactHash = artifacts.reduce((acc, item) => {
            // display only active
            const task = item.get('Task');
            if (!task) return acc;
            const kind = `Task${task.get('TaskBlockId')}`;
            if (!kind) return acc;
            if (acc[kind]) acc[kind].push(item);
            else acc[kind] = [item];
            return acc;
        }, {});

        return artifactHash;
    });
});
const getArtifactSmallBlocks = requestWrapper(req => {
    const where = Object.assign({}, req.query);
    return Artifact.findAll({
        where,
        include: [ArtifactUpload, Task],
    }).then(artifacts => {
        const artifactHash = artifacts.reduce((acc, item) => {
            // display only active
            const task = item.get('Task');
            if (!task) return acc;
            const kind = `Task${task.get('TaskBlockId')}`;
            if (!kind) return acc;
            
            // remove un nesecery objects
            delete item.Task

            // add to array
            if (acc[kind]) acc[kind].push(item);
            else acc[kind] = [item];
            return acc;
        }, {});

        return artifactHash;
    });
});

const getPath = requestWrapper(req => {
    const ctx = {};
    return Artifact.findOne({
        where: req.query,
        include: [{model: Artifact, as: 'ancestors'}],
        order: [[{model: Artifact, as: 'ancestors'}, 'hierarchyLevel']],
    })
        .then(artifact => {
            const artifacts = [artifact, ...artifact.ancestors];
            ctx.artifacts = artifacts;

            const ids = artifacts.map(artifact => artifact.get('id'));
            return ArtifactUpload.findAll({
                where: {
                    ArtifactId: {
                        [Sequelize.Op.or]: ids,
                    },
                },
            });
        })
        .then(artifactUploads => {
            ctx.artifactUploads = artifactUploads;
            const merged = {};
            // small array and I don't have time
            ctx.artifacts.map(artifact => {
                const id = artifact.get('id');
                merged[id] = artifact.toJSON();
                merged[id].ArtifactUploads = [];
                ctx.artifactUploads.map(artifactUpload => {
                    if (
                        artifact.get('id') === artifactUpload.get('ArtifactId')
                    ) {
                        merged[id].ArtifactUploads.push(
                            artifactUpload.toJSON(),
                        );
                    }
                });
            });
            return Object.values(merged);
        });
});

const byTask = requestWrapper(req => {
    const where = Object.assign({}, req.query);
    return Artifact.findAll({
        include: [
            ArtifactUpload,
            {
                model: Task,
                where,
            },
        ],
    });
});

const getArtifactsHirarchy = requestWrapper(req => {
    return Artifact.findAll({
        include: [ArtifactUpload, Account, ArtifactCritique],
        hierarchy: true,
    });
});

const listArtifact = requestWrapper(req => {
    const {limit, offset, ...query} = req.query;

    const conf = {
        include: [ArtifactUpload, ArtifactCritique, RequirementCritique],
        where: query,
        limit: limit && parseInt(limit),
        offset: offset && parseInt(offset),
    };
    return Artifact.findAll(conf);
});

const feed = requestWrapper(req => {
    const {limit, offset, ...query} = req.query;

    const conf = {
        include: [ArtifactUpload, Account, ArtifactCritique],
        where: query,
        limit: limit && parseInt(limit),
        offset: offset && parseInt(offset),
        order: [['id', 'desc']],
    };
    return Artifact.findAll(conf);
});

const addArtifact = requestWrapper(req => {
    const {body} = req;
    const {user} = req.session;
    const {taskId} = body;
    const artifacts = Array.isArray(body) ? body : [body];

    if (!taskId) {
        throw new BadRequestError('Missing taskId params');
    }
    const ctx = {};
    return Task.findByPk(taskId)
        .then(task => {
            if (!task) {
                throw new UnauthorizedError(
                    'You must have an assigned task first',
                );
            }
            if (task.AccountId !== user) {
                throw new UnauthorizedError('This is not your task');
            }
            ctx.task = task;
            artifacts.map(artifact => {
                artifact.kind = task.kind;
                artifact.ProjectId = task.ProjectId;
                artifact.AccountId = user;
                artifact.TaskId = task.id;
                if (task.ArtifactId) artifact.parentId = task.ArtifactId;
            });

            return Artifact.bulkCreate(artifacts, {
                returning: true,
                individualHooks: true,
            });
        })
        .then(artifacts => {
            ctx.artifact = artifacts[0];
            ctx.task.set({
                status: 'done',
            });
            return Promise.all([
                ctx.task.save(),
                AccountPayment.fromTask(ctx.task, user),
            ]);
        })
        .then(([task, payment]) => {
            ctx.payment = payment;
            return taskGenerator.run(task);
        })
        .then(() => ctx);
});

const getSet = requestWrapper(req => {
    const {user} = req.session;
    return SetArtifact.findAll({
        where: {
            AccountId: user,
        },
    });
});

const addSet = requestWrapper(req => {
    const {body} = req;
    const {user} = req.session;
    const {taskId} = body;
    if (!taskId) {
        throw new BadRequestError('Missing taskId params');
    }

    const ctx = {};
    return Task.findByPk(taskId)
        .then(task => {
            if (!task) {
                throw new UnauthorizedError(
                    'You must have an assigned task first',
                );
            }
            if (task.AccountId !== user) {
                throw new UnauthorizedError('This is not your task');
            }
            ctx.task = task;
            return SetArtifact.destroy({
                where: {
                    ProjectId: task.ProjectId,
                    AccountId: user,
                },
            });
        })
        .then(destroyed =>
            Promise.all(
                req.body.checked.map(ArtifactId =>
                    SetArtifact.create({
                        AccountId: user,
                        ProjectId: ctx.task.ProjectId,
                        ArtifactId,
                    }),
                ),
            ),
        )
        .then(sets => {
            ctx.sets = sets;
            ctx.task.set({
                status: 'done',
            });
            return Promise.all([
                ctx.task.save(),
                AccountPayment.fromTask(ctx.task, user),
            ]);
        })
        .then(([task, payment]) => {
            ctx.payment = payment;
            return taskGenerator.run(ctx.task);
        })
        .then(() => ctx);
});

const addPublicSets = requestWrapper(req => {
    const {body} = req;
    const {user} = req.session;

    const ctx = {};

    return Promise.all(
        req.body.checked.map(ArtifactId =>
            SetArtifact.create({
                AccountId: user,
                ProjectId: body.ProjectId,
                ArtifactId,
            }),
        ),
    );
});

module.exports = {
    feed,
    addArtifact,
    getArtifactHirarchy,
    getArtifactsHirarchy,
    getArtifactBlocks,
    getArtifactSmallBlocks,
    byTask,
    listArtifact,
    getArtifact,
    addSet,
    getSet,
    getPath,
    addPublicSets,
};
