import initDb from "../lib/db.js"
import { Sequelize, DataTypes } from 'sequelize';

const { db } = initDb()

const statuses = ['todo', 'progress', 'done'];

const Task = db.define(
    'Task',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        kind: {
            type: DataTypes.STRING(128),
            allowNull: false,
        },
        status: {
            type: DataTypes.ENUM(statuses),
            allowNull: false,
            defaultValue: 'todo',
        },
        payment: {
            type: DataTypes.FLOAT,
            allowNull: false,
            defaultValue: 0,
        },
        timeEstimation: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
    },
    {},
);


export default Task