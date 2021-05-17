import moment from 'moment'
import { Message } from '../models/index.js'
import log from './log.js'

const initSocketIO = (io) => {

    io.on("connection", socket => {

        socket.onAny((eventName, ...args) => {
            log.silly('socket', eventName, args)
        });

        socket.on("operatorSay", (json) => {
            Message.create({
                discussion_id: json.discussion_id,
                session_id: socket.id,
                msg: JSON.stringify(json),
                username: 'operator'
            }).then(message => {
                // response with message
                io.emit('operatorSaid', Message.toChatJson(message))
            })
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
                Message.create({
                    discussion_id: discussion_id,
                    session_id: '',
                    msg: "{\"message\":\"Hello, how can I help you\"}",
                    username: 'operator'
                }).then(message => {
                    socket.emit('operatorSaid', Message.toChatJson(message))
                })
            }, 2000)

        })


    });
}


export default initSocketIO