import initDb from "../lib/db.js"
import { Sequelize, DataTypes } from 'sequelize';

const { db } = initDb()

const ProjectRole = db.define(
    'ProjectRole',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        kind: {
            type: DataTypes.STRING(64),
            allowNull: false,
            defaultValue: 'reviewer',
        },
    },
    {},
);



export default ProjectRole;

