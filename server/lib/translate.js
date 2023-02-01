import { v2 } from '@google-cloud/translate'
// import recorder from 'node-record-lpcm16';
import sha1 from "sha1";
import log from "./log.js";
import { access, writeFile, readFile } from "fs/promises";

const { Translate } = v2
// Creates a client
const translationClient = new Translate();


export function translate(text, sourceLanguageCode, target) {

    if (!text){
        log.silly('no text')
        return Promise.resolve()
    }
    log.debug('Target',target)
    const lang = target.split('-')[0]
    // don't translate english
    if (lang == 'en' && sourceLanguageCode == 'en') {
        log.silly('no translation', lang)
        return Promise.resolve(text)
    }

    const sha = sha1(`${text}_${sourceLanguageCode}_${target}`);
    const fileName = `upload/${sha}.tmp`;

    return access(fileName)
        .then(() => {
            log.silly("Translate cache hit", fileName);
            return readFile(fileName, 'utf8')
        })
        .catch(() => {

            log.silly('translate', text, lang)
            
            return translationClient.translate(text, lang)
                .then(result => {
                    log.silly('translated', result[0], lang)
                    return result[0]

                })
                .then((translated) => {
                    return writeFile(fileName, translated, "utf-8")
                    .then(() => translated)
                })
        })

  // [END translate_v3_translate_text_3]
}


export function detect(text) {

    // don't translate english
    if (!text) {
        log.silly('no text')
        return Promise.resolve(text)
    }

    const sha = sha1(`detect_${text}`);
    const fileName = `upload/${sha}.tmp`;

    return access(fileName)
        .then(() => {
            log.silly("Detect cache hit", fileName);
            return readFile(fileName, 'utf8')
        })
        .catch(() => {

            log.silly('detect', text)
            
            return translationClient.detect(text)
                .then(result => {
                    const detections = Array.isArray(result) ? result : [result];
                    log.debug('Detected', detections)
                    return detections[0] && detections[0].language ?  detections[0].language : false

                })
                .then((detected) => {
                    log.silly('detectd',detected)
                    return writeFile(fileName, detected, "utf-8")
                    .then(() => detected)
                })
        })

  // [END translate_v3_translate_text_3]
}

export const detectAndTranslate = (text,toLanguage) => {
    return detect(text)
        .then(fromLanguage => {
            return translate(text, fromLanguage,toLanguage)
        })
}