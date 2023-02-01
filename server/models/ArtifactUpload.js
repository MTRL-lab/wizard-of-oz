import initDb from "../lib/db.js"
import { Sequelize, DataTypes } from 'sequelize';
import Participant from "./Participant.js";
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const { db } = initDb()

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadPath = path.resolve(__dirname, '../');


const ArtifactUpload = db.define('ArtifactUpload', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  file: { type: DataTypes.STRING },
  status: { type: DataTypes.INTEGER }
}, {});


ArtifactUpload.addHook('beforeDestroy', (obj, options) => {
  const fullPath = uploadPath + '/' + obj.file;
  return new Promise((resolve, reject) => {
    fs.exists(fullPath, exists => {
      if (!exists) {
        reject('Tried to unlink unexisting file ', fullPath);
      }
      fs.unlink(fullPath, err => {
        if (err) {
          reject('Failed to unlink file ', fullPath);
        }
        resolve();
      });
    })
  })

});


export default ArtifactUpload