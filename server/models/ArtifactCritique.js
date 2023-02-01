
import initDb from "../lib/db.js"
import { Sequelize, DataTypes } from 'sequelize';

const { db } = initDb()

const ArtifactCritique = db.define('ArtifactCritique', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  kind: { type: DataTypes.STRING(32), allowNull: false },
  description: { type: DataTypes.STRING(1024), allowNull: false },
}, {});




export default ArtifactCritique;
