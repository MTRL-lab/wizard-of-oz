import path from 'path';
import fs, { promises as fsp } from 'fs'
import { v4 as uuidv4 } from 'uuid';

import initDb from '../server/lib/db.js'
import logger from '../server/lib/log.js'
import {Artifact,ArtifactUpload} from './models/index.js';
import { exit } from 'process';

const destination = path.join(path.resolve(''), 'upload')

const getDirectories = source =>
    fs.readdirSync(source, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name)


const moveFile = (from, to) => {
    return new Promise((resolve, reject) => {
        fs.copyFile(from, to, err => {
            if (err) return reject(err);
            resolve(true);
        });
    });
};

const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

try {
    initDb()

    const dirtyArgs = process.argv.slice(2);
    const args = dirtyArgs.reduce((acc, arg) => {
        const [key, val] = arg.split('=')
        acc[key] = val
        return acc;
    }, {})

    if (!args.dir) {
        logger.error('Missing dir variable')
        exit(1)
    }

    if (!args.projectId) {
        logger.error('Missing projectId variable')
        exit(1)
    }

    const library = path.join(path.resolve(''), args.dir)

    if (!fs.existsSync(library)) {
        logger.error(`Directory ${library} does not exist`)
        exit(1)
    }



    const subDirectories = getDirectories(library)

    logger.debug('Got direcotires', subDirectories)

    delay(2000)
        .then(() => Promise.all(subDirectories.map(artifactDir => {

            const localPath = library + '/' + artifactDir
            logger.debug(`Reading ${localPath}`)

            // read images
            return fsp.readdir(localPath).then(dirContents => {


                return Artifact.create({
                    ProjectId: args.projectId,
                    kind: 'Control',
                    ParticipantId: 1,
                    TaskId: 1,
                    parentId: null
                }).then(artifact => {
                    
                    return Promise.all(dirContents.map(imagePath => {

                        const uuid = uuidv4()
                        const ext = imagePath.split('.').pop();
                        const finalPath = `${destination}/${uuid}.${ext}`;
                        const orignalPath = `${localPath}/${imagePath}`;
                        const ArtifactId = artifact.id

                        return moveFile(orignalPath, finalPath).then(() => {
                            return ArtifactUpload.create({
                                ArtifactId,
                                file: `upload/${uuid}.${ext}`,
                                ParticipantId: 1,
                            })
                        })
                    }))
                })

            }).catch(e => console.log(e))


        })))
        .then(() => {
            logger.debug("OK")
            exit(0)
        })
        .catch(e => console.log(e))


} catch (e) {
    console.log("Exception", e)
    exit(0)
}