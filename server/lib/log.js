import winston from 'winston';
import config from 'config'

const logConf = config.get('log')

const alignedWithColorsAndTime = winston
    .format
    .combine(
        winston.format.colorize({ all: true }),
        winston.format.timestamp(),
        winston.format.align(),
        winston.format.printf((info) => {
            const {
                timestamp,
                level,
                message,
                ...args
            } = info;
            const ts = timestamp
                .slice(0, 19)
                .replace('T', ' ');
            return `${ts} [${level}]: ${message} ${Object
                .keys(args)
                .length
                ? JSON.stringify(args, null, 2)
                : ''}`;
        }));

const logger = winston.createLogger({
    level: logConf.level,
    format: alignedWithColorsAndTime,
    transports: [
        new winston.transports.File({ filename: 'logs/error.log', level: 'error',handleExceptions: true }),
        new winston.transports.File({ filename: 'logs/combined.log',level: 'silly' }),
        new winston.transports.Console()
    ],
    exceptionHandlers: [
        new winston.transports.File({ filename: 'logs/error.log' })
    ]
});
const convertToString = (inputArray) => {
    const items = inputArray.map(item => {
        if (typeof item === 'string') return item;
        if (typeof item === 'number') return item;
        if (typeof item === 'function') return item;
        return JSON.stringify(item);
    })
    return items.join(' ');
}

const info = (...args) => logger.info(convertToString(args))
const error = (...args) => logger.error(convertToString(args))
const debug = (...args) => logger.debug(convertToString(args))
const warn = (...args) => logger.warn(convertToString(args))
const silly = (...args) => logger.silly(convertToString(args))

export default {
    info,
    error,
    debug,
    warn,
    silly
}