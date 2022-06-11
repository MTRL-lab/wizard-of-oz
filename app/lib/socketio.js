import { v4 as uuidv4 } from 'uuid'
import { readFile } from 'fs/promises';
import Bluebird from 'bluebird'
import log from './log.js';
import { say } from './ai.js'
import { Message } from '../models/index.js'
import { translate } from './translate.js'

// const projectBackground = `We plan the Tzahar Innovation, Culture and Education Center, a 3000 square meter building located between Rosh Pinna and Tuba Zangariyya, in north Israel. 20% of the spaces will be for free community use, while 80% will be rented offices that will sponsor the free community usage.

// The multi-purpose center can offer a variety of spaces for the community, offices, rehearsal rooms, warehouses, production spaces, workshops and studio spaces. A place for everyone!`

const projectBackground = 'The Technical University of Munich is planning to build a new architecture school instead of the outdated electrical facility on Theresienstrasse. The building will host the architecture school and the design will be based on the preferences of the students and faculty. That’s why we want to ask you about your ideas for the new building.'

const loadDefaultText = (lang) => {
    return Promise.all([
        readFile(new URL(`../../src/text/default.json`,
            import.meta.url)),
        readFile(new URL(`../../src/text/${lang}.json`,
            import.meta.url))
    ])
        .then(([baseJSON, overrideJSON]) => {

            const text = JSON.parse(baseJSON);
            const override = JSON.parse(overrideJSON);

            const rt = Object.assign({}, text, override)
            return rt
        })
}


function delayPromise(t, v) {
    return new Promise(function (resolve) {
        setTimeout(resolve.bind(null, v), t)
    });
}


const operatorSay = (io, socket, json, delay = 0) => {

    io.to(socket.id).emit('operatorWriting')
    return translate(json.message, 'en', json.language)
        .then(tanslatedMessage => {

            json.english = json.message
            json.message = tanslatedMessage;

            return Message.create({
                discussion_id: json.discussion_id,
                session_id: socket.id,
                msg: JSON.stringify(json),
                username: json.username
            })

        })
        .then(res => delayPromise(delay, res))
        .then((message) => {
            log.silly('Operator said', message)
            io.to(socket.id).emit('operatorSaid', Message.toChatJson(message))
            return message;
        })


        .catch(e => {
            console.error(e)
        })
}

const clientConnected = (io, socket, data) => {

    const { language, name } = data;
    const discussion_id = uuidv4()

    log.debug('discussion id', discussion_id)
    io.to(socket.id).emit('start', { discussion_id, language })

    return loadDefaultText(language)
        .then((text) => {

            const msgTemplate = {
                discussion_id,
                language,
                username: 'architect'
            }
            // the first message a user receives
            const msg = Object.assign({}, msgTemplate, {
                message: text.hello.replace('{username}', name),
            })

            return operatorSay(io, socket, msg, 2000)

                .then(() => {
                    // get project objectives
                    const msg = Object.assign({}, msgTemplate, {
                        message: projectBackground
                    })
                    return operatorSay(io, socket, msg, 2000)
                })
                .then(() => {
                    const msg = Object.assign({}, msgTemplate, {
                        message: text.requirements
                    })
                    return operatorSay(io, socket, msg, 2000)
                })


        })

}

const clientSay = (io, socket, json) => {

    translate(json.message, json.language, 'en')
        .then((tranlatedToEnglish) => {

            json.english = tranlatedToEnglish

            return Message.create({
                discussion_id: json.discussion_id,
                session_id: socket.id,
                msg: JSON.stringify(json),
                username: 'client'

            }).then(message => {
                const json = Message.toChatJson(message)
                io.to(socket.id).emit('clientSaid', json)
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
                                    return operatorSay(io, socket, msg, 2000)
                                })
                            })
                    }
                    return false
                })
        })


}

const initSocketIO = (io) => {

    io.on("connection", socket => {

        socket.onAny((eventName, ...args) => {
            log.silly('socket', eventName, args)
        });

        socket.on("clientSay", (data) => clientSay(io, socket, data))


        socket.on("clientWriting", () => {
            io.to(socket.id).emit('clientWriting')
        })
        socket.on("operatorWriting", () => {
            io.to(socket.id).emit('operatorWriting')
        })

        socket.on("clientConnected", (data) => clientConnected(io, socket, data))
    });
}


export default initSocketIO