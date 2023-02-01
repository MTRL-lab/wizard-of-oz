#!/usr/bin/env node

/*global process */
import http from 'http';
import config from 'config'
import { Server } from 'socket.io'
import app from './lib/bootstrap.js';
import initSocketIO from './lib/socketio.js'



function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}

try {

    console.log(`Start server launch`);
    const serverConf = config.get('httpServer')
    const ioConf = config.get('socketIo')

    const port = normalizePort(serverConf.port);

    app.set('port', port);

    const server = http.createServer(app);
    const io = new Server(server, ioConf)

    initSocketIO(io)

    server.listen(port);
    server.on('error', (error) => {
        console.error(error)
        if (error.syscall !== 'listen') {
            throw error;
        }

        var bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

        // handle specific listen errors with friendly messages
        switch (error.code) {
            case 'EACCES':
                console.error(bind + ' requires elevated privileges');
                process.exit(1);
                break;
            case 'EADDRINUSE':
                console.error(bind + ' is already in use');
                process.exit(1);
                break;
            default:
                throw error;
        }
    });
    server.on('listening', () => {
        const addr = server.address();
        const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
        console.log(`Listening on ${bind} ${process.env.NODE_ENV}`);
    });

} catch (e) {
    console.log(e);
}