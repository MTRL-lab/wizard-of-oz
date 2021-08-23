import OpenAI from "openai-api";
import config from "config";
import log from "../log.js";
import { Message } from "../../models/index.js";

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
        `The following is a conversation between an architect and his client. The architect wants to know everything about the project requirements. `,
        // `Here are some questions that the architect might ask:`,
        // `- What kind of project did you have in mind?`,
        // // `Why do you want to design and build a new home?`,
        // `- What major goals do you want to achieve?`,
        // `- Have you selected a site for this project?`,
        // `Are there views or landscape features you want taken into consideration when siting the building?`,
        // `- What is your budget for this project and how flexible is that budget?`,
        // `- How will you be using the spaces in this building?`,
        // `- Do you work from home?`,
        // `- Do you entertain people often?`,
        // `- Where do family spend most of their time?`,
        // `- Do you have strong feelings/ideas about design?`,
        // `Are there particular architectural features you’d like included in the building?`,
        // `In terms of design layouts, do you prefer open concept design or clearly delineated spaces?`,
        // `- Do you have preferences on building materials?`,
        // `What kind of aesthetic are you looking to achieve in the building?`,
        // `- Do you want to take advantage of natural light as much as possible?`,
        // `What are your biggest concerns/worries in undertaking this project?`,
        // `Does the design of the building need to incorporate spaces for equipment, unusual or large pieces of furniture, or artwork?`,
        // `Will this project include outbuildings or ancillary structures like storage buildings, pools, or guest quarters?`,
        // `Does project construction need to take into account persons with disabilities, mobility issues, or allergies?`,
        // `How long do you plan to own this building?`,

        // what is the budget
        `The transcript:`,
        discussion,
        `Architect:`,
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
      return response.data.choices[0].text.trim();
    })
    .catch(e => console.log(e))
};

export const gpt3Brief = (discussion_id) => {
  return getDiscussion(discussion_id).then((messages) => {

    const discussion = messages
      .map((message,i) => {
        // the first question is the prompt
        if (!i) return ''

        const json = JSON.parse(message.get("msg"));
        return `${json.message.replace('\n',' ')}`;
      })
      .join("\n");

    const prompt = [
      `Convert this discussion into a list of design requirements:`,
      discussion,
      `Design requirement list:`,
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
        // stop: ["\n", "Architect:", "Client:"]
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
      .catch(e => console.log(e))
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
