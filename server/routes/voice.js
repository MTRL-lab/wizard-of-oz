

import express from "express";
import wrapper from "../lib/route_wrapper.js";
import Message from '../models/Message.js'
import log from '../lib/log.js'
import { auth } from '../middleware/account.js'
import { textToSpeech, speechToText } from '../lib/voice.js'
const api = express.Router();


api.get("/:did/:id", auth, wrapper((req) => {

    const { id, did } = req.params;

    return Message.findAll({
        where: {
            id,
            discussion_id: did
        },
    })
    .then(message => {
        if (!message[0]){
            throw Error('Not found')
        }
        const json = JSON.parse(message[0].msg)
        log.silly('Voice', json.msg, json.language)
        return textToSpeech(json.message, json.language)
    })
    .then(file => {
        return ({ok:'ok',file})
    })
}))

export default api;
