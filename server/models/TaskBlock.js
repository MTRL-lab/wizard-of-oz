import initDb from "../lib/db.js"
import { Sequelize, DataTypes } from 'sequelize';

const { db } = initDb()

const statuses = ['todo', 'progress', 'done'];
const TaskBlock = db.define(
    'TaskBlock',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        kind: { type: DataTypes.STRING(64) },
        status: { type: DataTypes.ENUM(statuses), default: 'todo' },

        strategy: {
            type: DataTypes.STRING(32),
            allowNull: false,
            defaultValue: 'creative',
        },
    },
    {},
);

TaskBlock.isHierarchy();
export default TaskBlock;

