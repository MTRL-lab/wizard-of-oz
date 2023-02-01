import express from 'express'
import session from 'express-session'
import bodyParser from"body-parser";
import path from 'path';
import config from 'config'
import cors from 'cors'
import morgan from "morgan";

import initDb from './db.js'
import logger from './log.js'

import artifacts from '../routes/artifacts.js'
import tasks from '../routes/tasks.js'
import sign from '../routes/sign.js'
import brief from '../routes/brief.js'
import project from '../routes/project.js'
import participants from '../routes/participants.js'
import voice from '../routes/voice.js'
import meeting from '../routes/meeting.js'
import twillo from '../routes/twilio.js'
import { initEmail } from './email.js';

const sessionConfig = config.get("session")

const app = express()

initEmail();
const { sequelizeSessionStore } = initDb()

app.set('trust proxy', 1)
app.use(session({
    ...sessionConfig,
    store: sequelizeSessionStore
}))

app.use(cors((req, callback) => {
    var corsOptions = Object.assign({}, config.get('cors'));
    corsOptions.origin = req.header('Origin') // reflect (enable) the requested origin in the CORS response
    callback(null, corsOptions) // callback expects two parameters: error and options
}));

app.use(morgan('combined'))

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use(
    bodyParser.json({
      verify: (req, res, buf) => {
        req.rawBody = buf;
      },
    })
  );
// // serve static files
app.use('/', express.static(path.join(path.resolve(''), '../client/build')))
app.use('/', express.static(path.join(path.resolve(''), '../client/public')))
app.use('/upload', express.static(path.join(path.resolve(''), 'upload')))

// // set up api routes
app.use('/api/sign', sign)
app.use('/api/artifacts', artifacts)
app.use('/api/tasks', tasks)
app.use('/api/participants', participants)
app.use('/api/meeting', meeting)

app.use('/api/voice', voice)

app.use('/api/brief', brief)
app.use('/api/project', project)

app.use('/api/twilio', twillo)


// // Serve react index file
app.use((req, res) => {
    res.sendFile(path.join(path.resolve(''), "../client/build", "/index.html"));
});
// // error handlers
app.use((req, res) => {
    logger.debug('404', req.path)
    res.status(404).send("Sorry can't find that!")
})

app.use((err, req, res) => {
    logger.error('500', req.path, err)
    // render the error page
    res.status(500).send('Something broke!')
})



export default app;