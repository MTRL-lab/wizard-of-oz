import { Sequelize } from 'sequelize';
import expressSession from 'express-session'
import sequelizeSession from 'express-session-sequelize'
import config from 'config';

import logger from './log.js'

const sequelizeRebuild = config.get("sequelizeRebuild")

// set a db connection
const db = new Sequelize(config.get('db'), {
    logging: msg => logger.debug(msg)
});

// setup session db storage
const sequelizeSessionStore = new(sequelizeSession(expressSession.Store))({
    db
});

// This will sync and rebuild the db
db.sync({
    force: sequelizeRebuild
});

export { db, sequelizeSessionStore }