// Uploads
import express from 'express'
import wrapper from "../lib/route_wrapper.js"
import Task from "../models/Task.js";
import Sequelize  from 'sequelize';
import Project from "../models/Project.js";
import Artifact from "../models/Artifact.js";
import { task, consent } from '../middleware/tasks.js'
import {auth, authAdmin} from '../middleware/account.js'
import TaskBlock from '../models/TaskBlock.js';
import {BadRequestError} from '../lib/errors.js'

const router = express.Router();

router.get("/", authAdmin, wrapper(req => {
    return Task.findAll()
}))

router.get("/blocks", authAdmin, wrapper(req => {
    return TaskBlock.findAll()
}))

router.get("/my", auth, wrapper(req => {
    const { query } = req;
    const { user } = req.session;

    const where = Object.assign({}, query, {
        ParticipantId: user,
        status: {
            [Sequelize.Op.in]: ['todo','progress'],
        },
    });

    const ctx = {};
    return Task.findAll({
        where: where,
        include: [Project],
    })
        .then(tasks => {
            const artifacts = tasks.map(task => task.get('ArtifactId'));
            ctx.tasks = tasks;

            return Artifact.findAll({
                where: {
                    id: {
                        [Sequelize.Op.in]: artifacts,
                    },
                },
            });
        })
        .then(artifacts => {
            const tasks = [];
            const artifactHash = artifacts.reduce((acc, item) => {
                acc[parseInt(item.get('id'))] = item;
                return acc;
            }, {});

            for (let i = 0; i < ctx.tasks.length; i++) {
                tasks[i] = ctx.tasks[i].toJSON();

                tasks[i].Artifact = artifactHash[parseInt(tasks[i].ArtifactId)];
            }

            return tasks;
        });
}));

router.get('/:taskId', auth, task, consent, wrapper(req=>{
    const {params:{taskId}} = req;

    return Task.findByPk(taskId, {
        include: [Project],
    });
}))

router.patch('/:taskId', auth, task, consent, wrapper(req=>{
    const {task, body} = req;
    return  task.update(body);

}))


router.get('blocks', auth, authAdmin, wrapper(req => {
    const {query} = req;
    return TaskBlock.findAll({
        where: query,
    });
}));

router.post('/', auth, authAdmin,  wrapper(req => {
    const {body} = req;

    const {kind, ProjectId, ParticipantId, ArtifactId, TaskBlockId} = body;

    if (!kind){
        throw new BadRequestError('Missing kind')
    }
    if (!ProjectId){
        throw new BadRequestError('Missing ProjectId')
    }
    if (!ParticipantId ){
        throw new BadRequestError('Missing ParticipantId')
    }
    if (!TaskBlockId){
        throw new BadRequestError('Missing TaskBlockId')
    }
    

    let status = 'todo';
    if (ParticipantId) status = 'progress';

    const taskTemplate = {
        kind,
        status,
        ProjectId,
        ParticipantId,
        ArtifactId: ArtifactId || null,
        TaskBlockId,
    };

    return Task.create(taskTemplate);
}));

router.delete('/:taskId', wrapper(req => {
    const {params} = req;
    return Task.findByPk(params.taskId).then(task => task.destroy());
}));

export default router