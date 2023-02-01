import initDb from "../lib/db.js"
import { Sequelize, DataTypes } from 'sequelize';

const { db } = initDb()

const Artifact = db.define(
    'Artifact',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        description: { type: DataTypes.TEXT, allowNull: true },
        embed: { type: DataTypes.STRING(1024), allowNull: true },
        kind: { type: DataTypes.STRING(64) },
        active: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        },
        sub_set: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
    },
    {},
);


Artifact.isHierarchy();
export default Artifact;
