import OpenAI from "openai-api";
import config from "config";
import log from "./log.js";
import { Message } from "../models/index.js";

const apiKey = config.get("openai.key");
const openai = new OpenAI(apiKey);

const userName = (key) => (key == "operator" ? "Architect" : "Client");

const getDiscussion = (discussion_id) => {
  return Message.findAll({
    where: {
      discussion_id,
    },
  });
};
export const gpt3Say = (discussion_id) => {
  return getDiscussion(discussion_id)
    .then((messages) => {
      const discussion = messages
        .map((message) => {
          const json = JSON.parse(message.get("msg"));
          return `${userName(message.get("username"))}: ${json.message}`;
        })
        .join("\n");
      return discussion;
    })
    .then((discussion) => {
      const prompt = [
        `The following is a conversation with an Architect. The architect is asking questions about the design project. The architect wants to know the following:
        1. Where is the project?
        2. What kind of project the client has in mind?
        3. Who will use the place?
        4. What are the requirements?`,
        // what is the budget
        discussion,
        `Architect:`,
      ].join("\n");

      log.info("openAI say:", prompt);
      return openai.complete({
        engine: "davinci",
        prompt,
        maxTokens: 200,
        temperature: 0.9,
        topP: 1,
        presencePenalty: 0.6,
        frequencyPenalty: 0.5,
        bestOf: 1,
        n: 1,
        stream: false,
        stop: ["\n", "Architect:", "Client:"],
      });
    })
    .then((response) => {
      log.info("openAI response:", response.data);
      return response.data.choices[0].text.trim();
    });
};

export const gpt3Brief = (discussion_id) => {
  return getDiscussion(discussion_id).then((messages) => {
    if (messages.length < 8) {
      return "Not enough data";
    }
    const discussion = messages
      .map((message) => {
        const json = JSON.parse(message.get("msg"));
        return `${json.message}. `;
      })
      .join("\n");

    const prompt = [
      `Convert this Q&A into a list of design requirements:`,
      discussion,
      `Requirement list:`,
    ].join("\n");

    log.info("openAI brief:", prompt);
    return openai
      .complete({
        engine: "davinci", //-instruct-beta
        prompt,
        maxTokens: 1000,
        temperature: 0,
        topP: 1,
        presencePenalty: 0,
        frequencyPenalty: 1,
        bestOf: 1,
        n: 1,
        stream: false,
        // stop: ["\n", "Architect:", "Client:"]
      })
      .then((response) => {
        log.info("openAI response:", response.data);
        console.trace("");
        return response.data.choices[0].text
          .trim()
          .split(/\n|-/)
          .map((item) => item.trim())
          .reduce((acc, item) => {
            item ? acc.push(item) : acc;
            return acc;
          }, []);
      });
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
