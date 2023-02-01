import express from "express";
import { translate } from '../lib/translate.js'

import log from '../lib/log.js'
import wrapper from "../lib/route_wrapper.js";
import Brief from "../models/Brief.js";
import { brief } from "../lib/ai.js";
import Message from '../models/Message.js'
import {auth} from '../middleware/account.js'
import {task} from '../middleware/tasks.js'
import {BadRequestError} from '../lib/errors.js'

const api = express.Router();

api.post("/", auth, task, wrapper((req) => {

    const {id} = req.task;
    const {discussion_id,lng} = req.body

    return Message.findAll({
      where: {
        TaskId:id,
        discussion_id
      },
    })
    .then(messages => {
      //remove introduction
      messages.splice(0,3)
      if (!messages.length){
        throw new BadRequestError("No Messages")
      }
      return brief(messages)
    })
    .then(briefItms => {

      log.silly("Got brief items", briefItms)
      if (lng && lng!='en'){
        return translate(briefItms.join("\n"),  'en', lng)
        .then(translated => {
          log.silly("Translated brief items", translated)
          return translated.split("\n")
        })
      }
        
      else {
        return briefItms;
      }

    })


  })
);

api.patch("/",  auth, task, wrapper((req) => {
  
  const {body: {brief,artifactId} ,session,task} = req

  const metadata = {
    ParticipantId: session.user,	
    TaskId: task.id,	
    ArtifactId: artifactId,
    TaskBlockId:task.TaskBlockId
  }

  return Promise.all(brief.map((item) => {

    const briefItem = Object.assign({},item, metadata)

    return Brief.create(briefItem)
  
  }))})
);

export default api;
