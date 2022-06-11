import express from "express";
import fs from "fs";
import path from "path";
import { db } from "./db.js";
import wrapper from "./route_wrapper.js";
import { textToSpeech } from '../lib/voice.js'
import { Consent, Message, Brief, Tag } from "../models/index.js";
import { brief } from "./ai.js";

const api = express.Router();

// agree to participate
api.post(
  "/agree/",
  wrapper((req) => {
    const { read, answers, consent, name } = req.body;
    return Consent.create({ read, answers, consent, name });
  })
);

//display all messages
api.get(
  "/messages/",
  wrapper((req) => {
    const discussion_id = req.query.discussion_id || 0;
    return Message.findAll({
      where: {
        discussion_id,
      },
    }).then((messages) =>
      messages.map((message) => Message.toChatJson(message))
    );
  })
);

api.get(
  "/sessions/",
  wrapper(() => {
    // const query = `SELECT discussion_id, count(*) as num, 
    // min(createdAt) as start, max(createdAt) as end ,
    // max(createdAt) - min(createdAt) as ra 
    // FROM Messages 
    // WHERE discussion_id !=""
    // GROUP BY discussion_id`;

    const query = `select 
        msgs.discussion_id,
        count(*) as num, 
        sum(msgs.hasTags) as tags, 
        min(msgs.start) as start
      from ( 
          SELECT 
            group_concat(distinct m.discussion_id) as discussion_id, 
            sum(if(t.name!='',1,0)) as hasTags,
            min(m.createdAt) as start
          FROM Messages as m left join Tags as t on m.id = t.messageId 
          WHERE m.id group by m.id 
      ) as msgs group by msgs.discussion_id`;

    return db.query(query).then(([results]) => {
      return results;
    });
  })
);

api.post(
  "/video/",
  wrapper((req) => {
    if (!req.files || Object.keys(req.files).length === 0) {
      throw new Error("No files were uploaded.");
    }

    return Message.findByPk(req.body.message_id).then((message) => {
      Message.saveVideo(message, req.files.video);
    });
  })
);

api.get(
  "/consent_form/",
  wrapper(() => {
    return new Promise((resolve, reject) => {
      fs.readFile(
        path.join(path.resolve(""), "config", "consent.html"),
        "utf8",
        (err, content) => {
          if (err) reject(err);
          resolve(content);
        }
      );
    }).then((content) => {
      return {
        content: JSON.stringify(content),
      };
    });
  })
);

api.get(
  "/brief/",
  wrapper((req) => {

    const { discussion_id } = req.query

    return Message.findAll({
      where: {
        discussion_id
      },
    })
      .then(messages => {
        //remove introduction
        messages.splice(0, 3)
        if (!messages.length) {
          throw "No Messages"
        }
        
        return brief(messages)
      })
  })
);

api.post(
  "/brief/",
  wrapper((req) => Promise.all(req.body.map((item) => Brief.create(item))))
);

api.get(
  "/tag/",
  wrapper((req) => {
    const { messageId } = req.query;
    return Tag.findAll({ where: { messageId } });
  })
);
api.post(
  "/tag/",
  wrapper((req) => {
    const { name, messageId } = req.body;
    return Tag.create({ name, messageId });
  })
);

api.delete(
  "/tag/",
  wrapper((req) => {
    const { name, messageId } = req.body;
    return Tag.findOne({ name, messageId }).then((instance) =>
      instance.destroy()
    );
  })
);


api.get("/voice/:id", wrapper((req) => {

  const { id } = req.params;

  return Message.findAll({
    where: {
      id,
    },
  })
    .then(message => {
      if (!message[0]) {
        throw Error('Not found')
      }
      const json = JSON.parse(message[0].msg)
      return textToSpeech(json.message, json.language)
    })
    .then(file => {
      return ({ ok: 'ok', file })
    })
}))

export default api;
