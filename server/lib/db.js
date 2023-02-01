import { Sequelize } from 'sequelize';
import expressSession from 'express-session'
import sequelizeSession from 'express-session-sequelize'
import config from 'config';
import hierarchy from "sequelize-hierarchy"
import logger from './log.js'

const sequelizeRebuild = config.get("sequelizeRebuild")

var db = false
var sequelizeSessionStore = null;

const initDb = () => {
    try {
        
        if (!db) {

            hierarchy(Sequelize)
            
            const {database,username,password, host,dialect} = config.get('db');
            // set a db connection
            db = new Sequelize(database, username, password,{
                host,
                dialect,
                logging: msg => logger.debug(msg)
            });

            // setup session db storage
            sequelizeSessionStore = new (sequelizeSession(expressSession.Store))({
                db,
                options: {
                    checkExpirationInterval: 24  * 60 * 1000,
                    expiration: 30 * 24 * 60 * 60 * 1000,
                }
            });

            // This will sync and rebuild the db
            db.sync({
                force: sequelizeRebuild
            });
        }

        return { sequelizeSessionStore, db }
    }
    catch (e) {
        console.error(e)
    }
}



export default initDb