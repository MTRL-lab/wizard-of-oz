import { v4 as uuidv4 } from 'uuid'
import { readFile, writeFile } from 'fs/promises';
import Bluebird from 'bluebird'
import log from './log.js';
import { say } from './ai.js'
import { Message } from '../models/index.js'
import { translate } from './translate.js'
import Task from '../models/Task.js';
import Project from '../models/Project.js';



const loadDefaultText = (lang) => {
    return readFile(new URL(`../../client/src/assets/chat/default.json`,import.meta.url))
        .then((baseJSON) => {

            const text = JSON.parse(baseJSON);
            console.log(text)
            return text
        })
}


function delayPromise(t, v) {
    return new Promise(function (resolve) {
        setTimeout(resolve.bind(null, v), t)
    });
}

const isImage = (fileName) => {
    const lowerFileName = fileName.toLowerCase()
    return lowerFileName.endsWith('.png') || lowerFileName.endsWith('.jpg') || lowerFileName.endsWith('.jpeg')
}

const artifactImages = (artifact) => {

    return artifact.ArtifactUploads.reduce((acc, item) => {
        if (isImage(item.file))
            acc.push(item.file)
        return acc;
    }, []);
}

function getTask(taskId) {
    // get task
    return Task.findByPk(taskId)

    //check if task and user are related

}


class chatbot {

    callback = null;
    constructor({ sessionId, callback }) {
        this.sessionId = sessionId;
        this.callback = callback;
    }

    getDiscussionIdFromSession = (session_id) => {
        return Message.findOne({
            where: {
               session_id
            }
        })
        .then(message => {
            return message ? message.discussion_id : false
        })
    }

    clientConnected = ({ language, TaskId, artifact = null, user = {} }) => {

        const discussion_id = uuidv4()

        log.debug('discussion id', discussion_id)
        this.callback('start', { discussion_id, language })

        return Promise.all([
            getTask(TaskId),
            loadDefaultText(language)
        ])
            .then(([task, text]) => {
                if (!task) {
                    log.error(`Chatbot no task ${TaskId}`)
                    return
                }
                log.debug('discussion id', discussion_id)

                const msgTemplate = {
                    discussion_id,
                    language,
                    username: 'architect'
                }
                // the first message a user receives
                const msg = Object.assign({}, msgTemplate, {
                    message: text.hello.replace('{username}', user.fname),
                })

                return this.operatorSay(msg, task.id, 2000)

                    .then(() => {
                        if (artifact) {

                            const msg = Object.assign({}, msgTemplate, {
                                message: `${text.artifact1}`,
                                imgs: artifactImages(artifact)
                            })

                            return this.operatorSay(msg, task.id, 2000)
                                .then(() => {

                                    const msg = Object.assign({}, msgTemplate, {
                                        message: text.artifact2,
                                    })

                                    return this.operatorSay(msg, task.id, 2000)
                                })
                        }
                        else {

                            // get project objectives
                            return Project.findByPk(task.ProjectId)
                                .then(project => {
                                    const msg = Object.assign({}, msgTemplate, {
                                        message: text.introduction //project.projectBackground
                                    })
                                    return this.operatorSay(msg, task.id, 2000)
                                })
                                .then(() => {
                                    const msg = Object.assign({}, msgTemplate, {
                                        message: text.requirements
                                    })
                                    return this.operatorSay(msg, task.id, 2000)
                                })

                        }
                    })
            })

    }

    clientSay = (json) => {

        Promise.all([
            getTask(json.TaskId),
            translate(json.message, json.language, 'en')
        ])
            .then(([taskObj, tranlatedToEnglish]) => {

                json.english = tranlatedToEnglish

                return Message.create({
                    discussion_id: json.discussion_id,
                    TaskId: taskObj.id,
                    ParticipantId: taskObj.ParticipantId,
                    session_id: this.sessionId,
                    msg: JSON.stringify(json),
                    username: 'client'

                }).then(message => {
                    const json = Message.toChatJson(message)
                    this.callback('clientSaid', json)
                    return message;
                })
                    .then(() => {
                        //Initiate open AI call
                        if (json.bot === 'gpt3') {
                            return say(json.discussion_id)
                                .then(responseTexts => {
                                    log.silly('GPT responses', responseTexts)
                                    return Bluebird.mapSeries(responseTexts, (responseText, i) => {
                                        const msg = {
                                            discussion_id: json.discussion_id,
                                            message: responseText.text,
                                            language: json.language,
                                            username: responseText.username

                                        }
                                        return this.operatorSay(msg, taskObj.id, 2000)
                                    })
                                })
                        }
                        return false
                    })
            })
    }

    operatorSay = (json, TaskId, delay = 0) => {

        this.callback('operatorWriting')
        return translate(json.message, 'en', json.language)
            .then(tanslatedMessage => {

                json.english = json.message
                json.message = tanslatedMessage;

                return Message.create({
                    discussion_id: json.discussion_id,
                    TaskId,
                    session_id: this.sessionId,
                    msg: JSON.stringify(json),
                    username: json.username
                })

            })
            .then(res => delayPromise(delay, res))
            .then((message) => {
                log.silly('Operator said', message)
                this.callback('operatorSaid', Message.toChatJson(message))
                return message;
            })


            .catch(e => {
                console.error(e)
            })
    }
}

export default chatbot