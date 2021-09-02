import moment from 'moment'
import path from 'path';
import { readFile, writeFile } from 'fs/promises';

import log from './log.js';
import {say} from './ai.js'
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
        textToSpeech(json.message, json.language, json.username)

        .then((fileName) => {
                return Message.create({
                    discussion_id: json.discussion_id,
                    session_id: socket.id,
                    msg: JSON.stringify(json),
                    username: json.username

                }).then(message => {
                    message.audio = fileName
                    return message;
                })
            })
            .then(message => {
                const json = Message.toChatJson(message)
                log.debug('operatorSay',message.discussion_id, json)
                io.to(message.discussion_id).emit('operatorSaid', json)
            })

    } catch (e) {
        console.error(e)
    }
}


const initSocketIO = (io) => {

    io.on("connection", socket => {

        socket.onAny((eventName, ...args) => {
            log.debug('socket', eventName, args)
        });

        socket.on("operatorSay", (json) => {
            console.log(json)
            operatorSay(io, socket, json)
        })

        socket.on("clientSay", (json) => {
           
            Message.create({
                discussion_id: json.discussion_id,
                session_id: socket.id,
                msg: JSON.stringify(json),
                username: 'client'
            }).then(message => {
                const json = Message.toChatJson(message)
                log.debug('clientSay', json.discussion_id, json)
                io.to(json.discussion_id).emit('clientSaid',json)
                return message;
            }).then(() => {
                //Initiate open AI call
                if (json.bot==='gpt3'){
                    return say(json.discussion_id)
                        .then(responseTexts => {
                            log.debug('responseTexts', responseTexts)

                            responseTexts.forEach((responseText,i) => {
                            
                                setTimeout(() => {
                                        
                                    operatorSay(io, socket, {
                                        discussion_id:json.discussion_id,
                                        message: responseText.text,
                                        language:json.language,
                                        username: responseText.username
                                    
                                    })
                                }, i*1000)
                            })
                        })
                        
                }
            })
        })

        socket.on("clientVoice", (json) => {

            // eslint-disable-next-line no-undef
            const bufferValue = Buffer.from(json.audio, "base64");


            speechToText(json.audio, json.language)
                .then(text => {

                    log.debug('Got message', text)

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
                    io.to(json.discussion_id).emit('clientSaid', Message.toChatJson(message))
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



        socket.on("clientWriting", (json) => {
            // io.to(json.discussion_id).emit('clientWriting')
        })
        socket.on("operatorWriting", (json) => {
            // io.to(json.discussion_id).emit('operatorWriting')
        })
        socket.on("clientConnected", ({ language }) => {
            const discussion_id = moment().unix()

            log.debug('discussion id', discussion_id)
            socket.join(discussion_id);
            io.to(discussion_id).emit('start', { discussion_id, language })
            io.emit('startOperator', { discussion_id, language })
            

            loadDefaultText(language)
                .then(() => {


                    // the first message a user receives
                    operatorSay(io, socket, {
                        discussion_id,
                        message: text.hello1,
                        language,
                        username: 'architect'
                    })

                    setTimeout(() => {
                        operatorSay(io, socket, {
                            discussion_id,
                            message: text.hello2,
                            language,
                            username: 'architect'
                        })
                    }, 1000)
                    
                })
        })
    });
}


export default initSocketIO