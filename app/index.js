import express from 'express'
import session from 'express-session'
import path from 'path';
import config from 'config'
import cors from 'cors'
import fileUpload from 'express-fileupload';

import {
    sequelizeSessionStore as store
} from './lib/db.js'
import logger from './lib/log.js'
import routes from './lib/routes.js'
// import videoRoutes from './lib/video_routes.js'


const sessionConfig = config.get("session")

const app = express()

app.set('trust proxy', 1)
app.use(session({
    ...sessionConfig,
    store
}))
app.use(cors({
    origin: (origin, callback) => {
        callback(null, {
            origin: true
        })
    },
    "preflightContinue": false,
    "optionsSuccessStatus": 204
}))
app.use(fileUpload());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))


// serve static files
app.use('/', express.static(path.join(path.resolve(''), 'build')))
app.use('/', express.static(path.join(path.resolve(''), 'public')))
// app.use('/uploads', videoRoutes)
app.use('/uploads', express.static(path.join(path.resolve(''), 'uploads')))

// set up api routes
app.use('/api', routes)

// Serve react index file
app.use((req, res) => {
    res.sendFile(path.join(path.resolve(''), "build", "index.html"));
});
// error handlers
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