import moment from 'moment'
import path from 'path';
import { readFile, writeFile } from 'fs/promises';

import log from './log.js';
import { Message } from '../models/index.js'
import { textToSpeech, speechToText } from './voice.js'

let preparedStatements

readFile(new URL('../../src/preparedStatements.json',
        import.meta.url))
    .then(data => {
        preparedStatements = JSON.parse(data).preparedStatements
    })

const operatorSay = (io, socket, json) => {
    try {
        textToSpeech(json.message)

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

        socket.on("clientSay", (json, cb) => {

            Message.create({
                discussion_id: json.discussion_id,
                session_id: socket.id,
                msg: JSON.stringify(json),
                username: 'client'
            }).then(message => {
                cb(Message.toChatJson(message))
                io.emit('clientSaid', Message.toChatJson(message))
            })
        })

        socket.on("clientVoice", (json) => {

            // eslint-disable-next-line no-undef
            const bufferValue = Buffer.from(json.audio, "base64");


            speechToText(json.audio)
                .then(message => {
                    json.message = message
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
        })



        socket.on("clientWriting", () => {
            io.emit('clientWriting')
        })
        socket.on("operatorWriting", () => {
            io.emit('operatorWriting')
        })
        socket.on("clientConnected", () => {
            const discussion_id = moment().unix()

            log.debug('discussion id', discussion_id)
            io.emit('start', { discussion_id })

            // the first message a user receives
            setTimeout(() => {
                operatorSay(io, socket, {
                    discussion_id,
                    message: preparedStatements[0].message
                })
            }, 2000)

            setTimeout(() => {
                operatorSay(io, socket, {
                    discussion_id,
                    message: preparedStatements[1].message
                })
            }, 6000)

        })


    });
}


export default initSocketIO