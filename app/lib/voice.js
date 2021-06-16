import { TextToSpeechClient } from '@google-cloud/text-to-speech';
import { SpeechClient } from '@google-cloud/speech';
// import recorder from 'node-record-lpcm16';
import sha1 from 'sha1';
import log from './log.js'
import { access, writeFile } from 'fs/promises'


// Creates a client
const tts = new TextToSpeechClient();
const stt = new SpeechClient();

const config = {
    encoding: 'WEBM_OPUS',
    languageCode: 'en-US',
    audioChannelCount: 2
};


export const textToSpeech = (text, languageCode = 'en-US', ssmlGender = 'MALE') => {

    const effectsProfileId = ['telephony-class-application'];
    const sha = sha1(text);
    const fileName = `uploads/${sha}.mp3`
    try {

        const request = {
            input: { text },
            voice: { languageCode, ssmlGender },
            audioConfig: { audioEncoding: 'MP3', effectsProfileId: effectsProfileId },
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
    }

};

export const speechToText = (audio) => {

    try {
        // Detects speech in the audio file
        return stt.recognize({
                config,
                audio: {
                    content: audio,
                }
            })
            .then(([response]) => response.results
                .map(result => result.alternatives[0].transcript)
                .join('\n'))
    } catch (e) {
        console.error(e)
    }

}