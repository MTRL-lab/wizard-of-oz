import {gpt3Say, gpt3Brief} from './ai/openai.js'

// import {mockSay, mockBrief} from './ai/mockai.js'

//  // eslint-disable-next-line no-undef
// export const brief = (process.env.NODE_ENV==='development') ? mockBrief: gpt3Brief

//  // eslint-disable-next-line no-undef
// export const say = (process.env.NODE_ENV==='development') ? mockSay: gpt3Say


export const brief = gpt3Brief

 // eslint-disable-next-line no-undef
export const say = gpt3Say
