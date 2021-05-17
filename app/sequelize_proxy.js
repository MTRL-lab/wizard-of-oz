const config = require('config');

const db = config.get('db');

const db_parts = new URL(db)

const dialect = db_parts.protocol.replace(':', '');
const database = db_parts.pathname.replace('/', '');

module.exports = {
    development: {
        username: db_parts.username,
        password: db_parts.password,
        database: database,
        host: db_parts.hostname,
        dialect: dialect,
    },
    test: {
        username: db_parts.username,
        password: db_parts.password,
        database: database,
        host: db_parts.hostname,
        dialect: dialect,
    },
    production: {
        username: db_parts.username,
        password: db_parts.password,
        database: database,
        host: db_parts.hostname,
        dialect: dialect,
    }
};