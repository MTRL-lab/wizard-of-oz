import sdk from "microsoft-cognitiveservices-speech-sdk";
import { access, writeFile } from "fs/promises";
import log from "../log.js"
// import recorder from 'node-record-lpcm16';
import sha1 from "sha1";
import config from "config"





const support = {

    'he-IL': {
        'tts': 'he-IL',
        'stt': 'he-IL',
        'ttsName': 'he-IL-HilaNeural'
    }
};

export const langCodeTts = (language) => {
    return support[language]["tts"];
};

export const langCodeStt = (language) => {
    return support[language]["stt"];
};

export const langNameTts = (language) => {
    return support[language]["ttsName"];
};


export const speechToText = (audio, languageCode) => {
}



// we are done with the setup

// now create the audio-config pointing to our stream and
// the speech config specifying the language.


export const textToSpeech = (text, languageCode) => {
    log.silly('textToSpeech',languageCode,text)
    const sha = sha1(`${languageCode}_${text}`);
    const fileName = `upload/${sha}.mp3`;

    
    return access(fileName)
        .then(() => {
            log.silly("Voice cache hit", fileName);
            return fileName;
        })
        .catch(() => {
            var speechConfig = sdk.SpeechConfig.fromSubscription(
                config.get('microsoft.subscriptionKey'),
                config.get('microsoft.serviceRegion'));
        
            speechConfig.speechSynthesisLanguage = languageCode;
            speechConfig.speechSynthesisVoiceName = langNameTts(languageCode);
            speechConfig.speechSynthesisOutputFormat = sdk.SpeechSynthesisOutputFormat.Audio16Khz32KBitRateMonoMp3;

            log.silly("Voice cache fail", fileName);
            log.silly('Using voice',langNameTts(languageCode))
            const audioConfig = sdk.AudioConfig.fromAudioFileOutput(fileName);

            // create the speech synthesizer.
            var synthesizer = new sdk.SpeechSynthesizer(speechConfig, audioConfig);

            return new Promise((resolve, reject) => {
                // start the synthesizer and wait for a result.
                synthesizer.speakTextAsync(text, (result) => {
                   
                    if (result.reason === sdk.ResultReason.SynthesizingAudioCompleted) {
                        log.info("synthesis finished.");
                    } else {
                        log.info("Speech synthesis canceled, " + result.errorDetails +
                            "\nDid you update the subscription info?");
                    }
                    synthesizer.close();
                    synthesizer = undefined;
                    resolve(fileName)
                },
                    (err) => {
                        console.trace("err - " + err);
                        synthesizer.close();
                        synthesizer = undefined;
                        reject(err)
                    });
            })
        })
}



