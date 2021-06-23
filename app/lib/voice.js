import { TextToSpeechClient } from '@google-cloud/text-to-speech';
import { SpeechClient } from '@google-cloud/speech';
// import recorder from 'node-record-lpcm16';
import sha1 from 'sha1';
import log from './log.js'
import { access, writeFile } from 'fs/promises'


// Creates a client
const tts = new TextToSpeechClient();
const stt = new SpeechClient();

const support = {
    'en-US': {
        'tts': 'en-US',
        'stt': 'en-US'
    },
    'de-DE': {
        'tts': 'de-DE',
        'stt': 'de-DE'
    },
    'he-IL': {
        'tts': 'en-US',
        'stt': 'he-IL'
    }
}

export const langCodeTts = (language) => {
    return support[language]['tts']
}

export const langCodeStt = (language) => {
    return support[language]['stt']
}



export const textToSpeech = (text, languageCode) => {

    const ssmlGender = 'MALE';
    // const effectsProfileId = ['telephony-class-application'];
    const sha = sha1(`${languageCode}_${text}`);
    const fileName = `uploads/${sha}.mp3`
    try {

        const request = {
            input: { text },
            voice: { languageCode: langCodeTts(languageCode), ssmlGender },
            audioConfig: { audioEncoding: 'MP3' },
        };

        return access(fileName)
            .then(() => {
                log.silly('Voice cache hit', fileName)
                return fileName
            })
            .catch(() => {
                return tts.synthesizeSpeech(request)
                    .then(([response]) => {
                        log.silly('Voice cache miss', fileName)
                        return response.audioContent
                    })
                    .then(audioContent => writeFile(fileName, audioContent, 'binary'))
                    .then(() => fileName)
            })

    } catch (e) {
        console.error(e)
        throw e
    }

};

export const speechToText = (audio, languageCode) => {

    try {
        // Detects speech in the audio file
        return stt.recognize({
                config: {
                    encoding: 'WEBM_OPUS',
                    languageCode: langCodeStt(languageCode),
                    audioChannelCount: 2,
                    enableAutomaticPunctuation: true,
                    useEnhanced: true
                },
                audio: {
                    content: audio,
                }
            })
            .then(([response]) => {
                log.silly('STT', response)
                return response.results
                    .map(result => result.alternatives[0].transcript)
                    .join('\n')
            })
    } catch (e) {
        console.error(e)
        throw e
    }

}