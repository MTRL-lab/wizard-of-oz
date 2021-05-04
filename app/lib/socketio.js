import { Message } from '../models/index.js'
import log from './log.js'

const initSocketIO = (io) => {

    io.on("connection", socket => {

        socket.onAny((eventName, ...args) => {
            log.silly('socket', eventName, args)
        });
        socket.on("start", () => {
            socket.emit("start");
        });

        socket.on("stop", () => {
            socket.emit("stop");
        });

        socket.on("operatorSay", (json) => {
            Message.create({
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
                session_id: socket.id,
                msg: JSON.stringify(json),
                username: 'client'
            }).then(message => {
                cb(Message.toChatJson(message))
                io.emit('clientSaid', Message.toChatJson(message))
            })


        })

        // the first message a user receives
        setTimeout(() => {
            socket.emit('start')
            Message.create({
                session_id: '',
                msg: "{\"message\":\"Hello, how can I help you\"}",
                username: 'operator'
            }).then(message => {
                socket.emit('operatorSaid', Message.toChatJson(message))
            })
        }, 2000)
    });
}


export default initSocketIO