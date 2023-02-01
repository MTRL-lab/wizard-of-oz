import express from "express";
import wrapper from "../lib/route_wrapper.js";
import { sendInvitation } from "../lib/email.js"

import {auth} from '../middleware/account.js'
import {task} from '../middleware/tasks.js'
import Participant from "../models/Participant.js";

const api = express.Router();

api.post("/", auth, task, wrapper((req) => {

    const participantId = req.session.user
    const {id} = req.task;
    const {subject, start,end,location,summary,description} = req.body

    return Participant.findByPk(participantId)
    .then(participant => {
        return sendInvitation(participant.email,subject, description,{start, end, location, summary})
        .then(()=>({sucess:true}))

    })

      
  })
);


export default api;
