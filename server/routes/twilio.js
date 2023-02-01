import express from 'express';
import twilio from "twilio";
import { phone } from 'phone';
import clm from 'country-locale-map';
import logger from '../lib/log.js'
import chatbot from '../lib/chatbot.js';


if (!process.env.TWILIO_AUTH_TOKEN){
  logger.error('No TWILIO_AUTH_TOKEN')
}
if (!process.env.TWILIO_ACCOUNT_SID){
  logger.error('No TWILIO_ACCOUNT_SID')
}


const twiloApp = twilio();


const router = express.Router();

const getLanguageFromPhone = (phoneNumber) => {


  const { isValid, countryIso2 } = phone(phoneNumber);//
  if (!isValid) {
    return 'en-US';
  }
  return clm.getLocaleByAlpha2(countryIso2).replace('_', '-')
}


router.post("/message", twilio.webhook(), (req, res) => {


  const chatBot = new chatbot({
    sessionId: req.body.WaId,
    callback: (eventName, data) => {
      if (eventName == 'operatorSaid') {
        const message = JSON.parse(data.msg)
        twiloApp.messages.create({
          body: message.message,
          to: req.body.From,
          from: 'whatsapp:+14155238886',
        })
          .then((message) => console.log(message))
          .catch((error) => {
            // You can implement your fallback code here
            console.log(error);
          });
      }
    }
  })


  let response = '';
  logger.info('From twilio', req.body)
  switch (req.body.SmsStatus) {
    case 'received':
      const language = getLanguageFromPhone(`+${req.body.WaId}`);

      chatBot.getDiscussionIdFromSession(req.body.WaId)
        .then(discussion_id => {

          if (!discussion_id) {

            chatBot.clientConnected({
              TaskId: 158,
              language,
              bot: 'gpt3',
              user: {
                fname: 'Jonathan'
              }
            })
          }
          else {

            chatBot.clientSay({
              TaskId: 158,
              language,
              bot: 'gpt3',
              discussion_id,
              message: req.body.Body
            })
          }
        })

      break;
    default:
      response = ''
  }
  // Twilio Messaging URL - receives incoming messages from Twilio



  res.set("Content-Type", "text/xml");
  res.send(response);
});
export default router;