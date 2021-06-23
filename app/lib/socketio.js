import moment from 'moment'
import path from 'path';
import { readFile, writeFile } from 'fs/promises';

import log from './log.js';
import { Message } from '../models/index.js'
import { textToSpeech, speechToText } from './voice.js'

let text = []

const loadDefaultText = (lang) => {
    return Promise.all([
            readFile(new URL(`../../src/text/default.json`,
                import.meta.url)),
            readFile(new URL(`../../src/text/${lang}.json`,
                import.meta.url))
        ])
        .then(([baseJSON, overrideJSON]) => {

            text = JSON.parse(baseJSON);
            const override = JSON.parse(overrideJSON);

            Object.assign(text, override)
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
                        message: text.error,
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
                        message: text.hello1,
                        language
                    })
                    setTimeout(() => {
                        operatorSay(io, socket, {
                            discussion_id,
                            message: text.hello2,
                            language
                        })
                    }, 1000)
                })
        })
    });
}


export default initSocketIO