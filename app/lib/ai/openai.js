import OpenAI from "openai-api";
import config from "config";
import log from "../log.js";
import { Message } from "../../models/index.js";

const apiKey = config.get("openai.key");
const openai = new OpenAI(apiKey);

const userNames = ['architect'];

const parseDiscussion = (messages, limit = 0) =>
  messages
    .map((message) => {
      const json = JSON.parse(message.get("msg"));
      return `${message.get("username")}: ${json.message}`;
    })
    // .slice(limit ? -limit : 0)
    .join("\n")
    .replace("\n\n", "\n");

const getDiscussion = (discussion_id) => {
  return Message.findAll({
    where: {
      discussion_id,
    },
  });
};

const parseResponse = (text) => {
  const parts = text.split(/\n./);

  // junk flag to ignore text that is not relevant
  var junk = false;

  return parts.reduce((acc, cur, currentIndex) => {
    // make sure no to accept output if there is junk
    if (!cur || junk || currentIndex > 3) return acc;

    const fragments = cur.split(/:|-|–]/);


    // if we have no speaker, and it's not the first iteration, 
    // it might be a continuation of the previous message
    if (!fragments[1] && currentIndex) {
      acc[acc.length - 1].text += ` ${fragments[0].trim()}`;
      console.log("concat");
      return acc;
    }

    const text = fragments.reduce((acc, cur, index) => {
      if (index) acc += ` ${cur.trim()}`;
      return acc;
    }, "");
    console.log(fragments, text);

    // check if username is in the line
    for (let i=0; userNames[i]; i++){
      const regex = new RegExp(`^${userNames[i]}`);
      if (cur.toLowerCase().match(regex)) {
        if (text.trim()) {
          acc.push({
            username: fragments[0].toLowerCase(),
            text: text.trim(),
          });
          return acc;
        }
      }
    }

    console.log("junk");
    junk = true;
    return acc; 
    
  }, []);
};

export const gpt3Say = (discussion_id) => {
  
  const speaker = userNames[Math.floor(Math.random() * userNames.length)];

  return getDiscussion(discussion_id)
    .then((messages) => parseDiscussion(messages, 12))
    .then((discussion) => {
      
      const prompt = [
        `The following is a discussion between an architect and his client. The architect asks many questions to get a understanding the design project. The architect is helpful, clever, goes into details and helps the client to express his needs.`,
        `The architect needs to know which rooms the client needs, who is going to use them, what is the style the client likes.`,

        // what is the budget
        `The discussion transcript:`,
        discussion,
        `${speaker}:`,
      ].join("\n");

      log.info("openAI say:", prompt);
      return openai.complete({
        engine: "davinci",
        prompt,
        maxTokens: 170,
        temperature: 0.9,
        topP: 1,
        presencePenalty: 0.1,
        frequencyPenalty: 0.6,
        bestOf: 1,
        n: 1,
        stream: false,
        stop: ["client:","Client:"],
      });
    })
    .then((response) => {
      log.info("openAI response:", response.data);

      // add speaker to response
      const responseArray = parseResponse(`${speaker}: ${response.data.choices[0].text}`);
      return responseArray;
    })
    .catch((e) => console.log(e));
};

export const gpt3Brief = (discussion_id) => {
  return getDiscussion(discussion_id).then((messages) => {
    const discussion = parseDiscussion(messages);

    const prompt = [
      `Here is a discussion between an architect and his client:`,
      discussion,
      `\n-----\nMake a list summarizing the design requirements from the discussion:`,
    ].join("\n");

    log.info("openAI brief:", prompt);
    return openai
      .complete({
        engine: "davinci-instruct-beta", //-instruct-beta
        prompt,
        maxTokens: 1000,
        temperature: 0.16,
        topP: 1,
        presencePenalty: 0.38,
        frequencyPenalty: 0.35,
        bestOf: 1,
        n: 1,
        stream: false,
        // stop: ["\n\n"]
      })
      .then((response) => {
        log.info("openAI response:", response.data);
        return response.data.choices[0].text
          .trim()
          .split(/\n|-/)
          .map((item) => item.trim())
          .reduce((acc, item) => {
            item ? acc.push(item) : acc;
            return acc;
          }, []);
      })
      .catch((e) => console.log(e));
  });
};

// response = openai.Completion.create(
//     engine="",
//     prompt="",
//     temperature=0.7,
//     max_tokens=1067,
//     top_p=1,
//     frequency_penalty=0,
//     presence_penalty=0
//   )
// }
