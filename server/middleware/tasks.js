import { errorView} from '../lib/route_wrapper.js'
import Task from "../models/Task.js"
import { UnauthorizedError, NotFoundError,BadRequestError, NotAllowedError } from "../lib/errors.js"
import Participant from '../models/Participant.js';


export const task = (req,res,next) => {

    const {body, params} = req;
    const taskId = body.taskId || params.taskId
    const {user} = req.session;

    if (!taskId) {
        const error=  new BadRequestError('Missing taskId params');
        return errorView(req,res,error)
    }

    Task.findByPk(taskId)
        .then(task => {
            if (!task) {
                const error= new UnauthorizedError(
                    'You must have an assigned task first',
                );
                return errorView(req,res,error)
            }
            if (task.ParticipantId !== user) {
                const error= new UnauthorizedError('This is not your task');
                return errorView(req,res,error)
            }
            req.task = task;
            next()
        })

}

export const consent = (req, res, next) => {

    Participant.findByPk(req.session.user)
        .then(user => {
            if (user.consent &&
                user.consent.consent1 &&
                user.consent.consent2 &&
                user.consent.consent3 &&
                user.consent.consent4 &&
                user.consent.consent5
                ) {
                next();
            }
            else {
                const error= new NotAllowedError(
                    'Missing consent',
                );
                return errorView(req,res,error)
            }
        });
}

// const requestWrapper = require('../lib/requestWrapper');
// const config = require('config');
// const {BadRequestError, NotFoundError} = require('../lib/errors');
// const {
//     Task,
//     Project,
//     Artifact,
//     Sequelize,
//     Account,
//     TaskBlock,
// } = require('../models');

// const artifacts = config.get('tasks');

// const statusTaskList = requestWrapper(req => {
//     const {query} = req;
//     const {user} = req.session;
//     const whereNotAssigned = Object.assign({}, query);
//     query.AccountId = user;
//     query.status = 'todo';

//     return Promise.all([
//         Task.findAll({
//             where: query,
//             limit: 1,
//         }),
//         Task.count({
//             where: whereNotAssigned,
//         }),
//     ]).then(([my, notAssigned]) => ({my, notAssigned}));
// });

// const listTasks = requestWrapper(req => {
//     const {query} = req;
//     return Task.findAll({
//         include: [Account],
//         where: query,
//     });
// });

// const listBlocks = requestWrapper(req => {
//     const {query} = req;
//     return TaskBlock.findAll({
//         where: query,
//     });
// });

// const myTaskList = requestWrapper(req => {
//     const {query} = req;
//     const {user} = req.session;

//     const where = Object.assign({}, query, {
//         AccountId: user,
//         status: 'progress',
//     });

//     const ctx = {};
//     return Task.findAll({
//         where: where,
//         include: [Project],
//     })
//         .then(tasks => {
//             const artifacts = tasks.map(task => task.get('ArtifactId'));
//             ctx.tasks = tasks;

//             return Artifact.findAll({
//                 where: {
//                     id: {
//                         [Sequelize.Op.in]: artifacts,
//                     },
//                 },
//             });
//         })
//         .then(artifacts => {
//             const tasks = [];
//             const artifactHash = artifacts.reduce((acc, item) => {
//                 acc[parseInt(item.get('id'))] = item;
//                 return acc;
//             }, {});

//             for (let i = 0; i < ctx.tasks.length; i++) {
//                 tasks[i] = ctx.tasks[i].toJSON();

//                 tasks[i].Artifact = artifactHash[parseInt(tasks[i].ArtifactId)];
//             }

//             return tasks;
//         });
// });

// const assignTask = requestWrapper(req => {
//     const {body} = req;
//     const {user} = req.session;

//     if (!req.body.ProjectId || !req.body.kind) {
//         throw new BadRequestError('Missing params');
//     }

//     const myTaskQuery = Object.assign({}, body, {
//         AccountId: user,
//         status: 'progress',
//     });

//     const nextTaskQuery = Object.assign({}, body, {
//         status: 'todo',
//         AccountId: {
//             [Sequelize.Op.not]: true,
//         },
//     });

//     // check if doesnt have task assigned
//     return (
//         Task.findAll({where: myTaskQuery, limit: 1})

//             .then(assignedTask => {
//                 if (assignedTask && assignedTask[0])
//                     throw new NotFoundError('You have an assigned task');

//                 return Task.findAll({where: nextTaskQuery, limit: 1});
//             })
//             // check if tasks exist
//             .then(task => {
//                 if (!task || !task[0])
//                     throw new NotFoundError('No tasks found');
//                 // update task
//                 return task[0].update({AccountId: user, status: 'progress'});
//             })
//     );
// });

// const availableTaskList = requestWrapper(req => {
//     return Task.findAll({
//         attributes: {
//             include: [
//                 [Sequelize.fn('COUNT', Sequelize.col('Task.id')), 'totalCount'],
//                 [
//                     Sequelize.fn(
//                         'SUM',
//                         Sequelize.fn(
//                             'IF',
//                             {
//                                 status: {
//                                     [Sequelize.Op.eq]: 'todo',
//                                 },
//                             },
//                             1,
//                             0,
//                             // Sequelize.Op.and(`Task.AccountId IS NULL AND status='todo'`), '0', '1'
//                         ),
//                     ),
//                     'todo',
//                 ],
//                 [
//                     Sequelize.fn(
//                         'SUM',
//                         Sequelize.fn(
//                             'IF',
//                             {
//                                 status: {
//                                     [Sequelize.Op.eq]: 'progress',
//                                 },
//                             },
//                             1,
//                             0,
//                             // Sequelize.Op.and(`Task.AccountId IS NULL AND status='todo'`), '0', '1'
//                         ),
//                     ),
//                     'progress',
//                 ],
//             ],
//         },
//         include: [Project, Artifact],
//         where: {
//             status: {
//                 [Sequelize.Op.notIn]: ['done'],
//             },
//         },
//         group: ['ProjectId', 'kind'],
//     });
// });

// const singleTask = requestWrapper(req => {
//     const {params} = req;

//     return Task.findById(params.taskId, {
//         include: [Project],
//     });
// });

// const createTask = requestWrapper(req => {
//     const {body} = req;

//     if (!body.ProjectId || !body.kind) {
//         throw new BadRequestError('Missing params');
//     }
//     const {kind, ProjectId, AccountId, ArtifactId, TaskBlockId} = body;
//     const {timeEstimation, payment} = artifacts[kind];

//     let status = 'todo';
//     if (AccountId) status = 'progress';

//     const taskTemplate = {
//         kind,
//         status,
//         payment,
//         timeEstimation,
//         ProjectId,
//         AccountId,
//         ArtifactId: ArtifactId || null,
//         TaskBlockId,
//     };

//     return Task.create(taskTemplate);
// });

// const deleteTask = requestWrapper(req => {
//     return Task.findByPk(req.params.taskId).then(task => task.destroy());
// });

// module.exports = {
//     assignTask,
//     myTaskList,
//     statusTaskList,
//     availableTaskList,
//     singleTask,
//     listTasks,
//     createTask,
//     deleteTask,
//     listBlocks,
// };
