import { v2 } from '@google-cloud/translate'
// import recorder from 'node-record-lpcm16';
import sha1 from "sha1";
import log from "./log.js";
import path from 'path';
import { access, writeFile, readFile } from "fs/promises";

const { Translate } = v2
// Creates a client
const translationClient = new Translate();


export function translate(text, sourceLanguageCode, target) {

    
    const lang = target.split('-')[0]
    const sourceLang =sourceLanguageCode.split('-')[0]
    // don't translate english
    if (lang == 'en' && sourceLang == 'en') {
        log.silly('no translation', lang)
        return Promise.resolve(text)
    }

    const sha = sha1(`${text}_${sourceLanguageCode}_${target}`);
    const fileName = path.resolve(path.resolve(''), `uploads/${sha}.tmp`) ;

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

