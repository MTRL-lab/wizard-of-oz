import {speechToText, textToSpeech as gogTTS, langNameTts,langCodeStt,langCodeTts} from './voice/google.js'

import {textToSpeech as msTTS} from './voice/microsoft.js'


const textToSpeech = (text, languageCode) => {

    if (languageCode =='he-IL')
        return msTTS(text, languageCode)
    else 
        return gogTTS(text, languageCode)
}
export { 
    speechToText,
    textToSpeech, 
    langNameTts,
    langCodeStt,
    langCodeTts
}
