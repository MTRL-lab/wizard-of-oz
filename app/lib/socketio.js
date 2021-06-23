import moment from 'moment'
import path from 'path';
import { readFile, writeFile } from 'fs/promises';

import log from './log.js';
import { Message } from '../models/index.js'
import { textToSpeech, speechToText } from './voice.js'

let preparedStatements, errors

const loadDefaultText = (lang) => {
    return readFile(new URL(`../../src/preparedStatements_${lang}.json`,
            import.meta.url))
        .then(data => {
            preparedStatements = JSON.parse(data).preparedStatements
            errors = JSON.parse(data).errors
        })
}


const operatorSay = (io, socket, json) => {
    try {
        textToSpeech(json.message, json.language)

        .then((fileName) => {
                return Message.create({
                    discussion_id: json.discussion_id,
                    session_id: socket.id,
                    msg: JSON.stringify(json),
                    username: 'operator'

                }).then(message => {
                    message.audio = fileName
                    return message;
                })
            })
            .then(message => {
                io.emit('operatorSaid', Message.toChatJson(message))
            })

    } catch (e) {
        console.error(e)
    }
}


const initSocketIO = (io) => {

    io.on("connection", socket => {

        socket.onAny((eventName, ...args) => {
            log.silly('socket', eventName, args)
        });

        socket.on("operatorSay", (json) => {
            operatorSay(io, socket, json, 'operator')
        })

        socket.on("clientSay", (json) => {

            Message.create({
                discussion_id: json.discussion_id,
                session_id: socket.id,
                msg: JSON.stringify(json),
                username: 'client'
            }).then(message => {
                Message.toChatJson(message)
                io.emit('clientSaid', Message.toChatJson(message))
            })
        })

        socket.on("clientVoice", (json) => {

            // eslint-disable-next-line no-undef
            const bufferValue = Buffer.from(json.audio, "base64");


            speechToText(json.audio, json.language)
                .then(text => {

                    log.silly('Got message', text)

                    if (!text) {
                        throw new Error('No text response')
                    }

                    json.message = text
                    delete json.audio
                    return Message.create({
                        discussion_id: json.discussion_id,
                        session_id: socket.id,
                        msg: JSON.stringify(json),
                        username: 'client'
                    })
                })
                .then(message => {
                    io.emit('clientSaid', Message.toChatJson(message))
                    const audioPath = path.join(path.resolve(''), "uploads", `audio${message.id}.webm`);
                    return writeFile(audioPath, bufferValue)

                })
                .catch((e) => {
                    log.info(e)
                    return operatorSay(io, socket, {
                        discussion_id: json.discussion_id,
                        message: errors[0].message,
                        language: json.language
                    })
                })

        })



        socket.on("clientWriting", () => {
            io.emit('clientWriting')
        })
        socket.on("operatorWriting", () => {
            io.emit('operatorWriting')
        })
        socket.on("clientConnected", ({ language }) => {
            const discussion_id = moment().unix()

            log.debug('discussion id', discussion_id)
            io.emit('start', { discussion_id, language })

            loadDefaultText(language)
                .then(() => {


                    // the first message a user receives
                    operatorSay(io, socket, {
                        discussion_id,
                        message: preparedStatements[0].message,
                        language
                    })
                    setTimeout(() => {
                        operatorSay(io, socket, {
                            discussion_id,
                            message: preparedStatements[2].message,
                            language
                        })
                    }, 3000)

                    setTimeout(() => {
                        operatorSay(io, socket, {
                            discussion_id,
                            message: preparedStatements[1].message,
                            language
                        })
                    }, 8000)
                })
        })
    });
}


export default initSocketIO