import express from 'express';
import fs from 'fs';
import path from 'path';

import wrapper from './route_wrapper.js'
import { Consent, Message } from '../models/index.js'

const api = express.Router();

// agree to participate
api.post('/agree/', wrapper((req) => {
    const { read, answers, consent, name } = req.body
    return Consent.create({ read, answers, consent, name })
}))

//display all messages
api.get('/messages/', wrapper(() => {
    return Message.findAll()
        .then(messages => messages.map(message => Message.toChatJson(message)))
}))

api.post('/video/', wrapper((req) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        throw new Error('No files were uploaded.');
    }

    return Message.findByPk(req.body.message_id)
        .then(message => {
            Message.saveVideo(message, req.files.video)
        })

}))

api.get('/consent_form/', wrapper(() => {
    return new Promise((resolve, reject) => {
        fs.readFile(path.join(path.resolve(''), "config", "consent.html"), 'utf8', (err, content) => {
            if (err) reject(err);
            resolve(content)
        })

    }).then(content => {
        return {
            content: JSON.stringify(content)
        }
    })
}))

export default api