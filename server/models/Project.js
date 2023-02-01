
import initDb from "../lib/db.js"
import { Sequelize, DataTypes } from 'sequelize';

const { db } = initDb()

const Project = db.define(
    'Project',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: { type: DataTypes.STRING(128), allowNull: false },
        clientBackground: { type: DataTypes.STRING(1000), allowNull: false },
        projectBackground: { type: DataTypes.STRING(1000), allowNull: false },
        objectives: { type: DataTypes.STRING(2000), allowNull: false },
        siteBackground: { type: DataTypes.STRING(1000), allowNull: false },
        location: { type: DataTypes.STRING, allowNull: false },
        audience: { type: DataTypes.STRING(500), allowNull: false },
        budget: { type: DataTypes.STRING, allowNull: false },
        strategy: { type: DataTypes.STRING(32), allowNull: false },
    },
    {},
);




export default Project
