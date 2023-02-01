import initDb from "../lib/db.js"
import { Sequelize, DataTypes } from 'sequelize';

const { db } = initDb()

const Selection = db.define(
    'Selection',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        }
    },
    {},
);


export default Selection