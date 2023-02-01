import log from './log.js';
import chatbot from './chatbot.js';


const initSocketIO = (io) => {

    io.on("connection", socket => {

        const chatBot = new chatbot({
            sessionId:socket.id,
            callback: (eventName, data) => io.to(socket.id).emit(eventName, data)
        })
        

        socket.onAny((eventName, ...args) => log.silly('socket', eventName, args));
        socket.on("clientSay", (data) => chatBot.clientSay(data))
        socket.on("clientWriting", () => chatBot.callback('clientWriting'))
        socket.on("operatorWriting", () => chatBot.callback('operatorWriting'))
        socket.on("clientConnected", (data) => chatBot.clientConnected(data))
    });
}


export default initSocketIO