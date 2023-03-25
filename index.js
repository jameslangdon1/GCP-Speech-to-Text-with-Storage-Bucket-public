const speech = require('@google-cloud/speech');
const {Storage} = require('@google-cloud/storage');

require('dotenv').config();

async function main() {
    const client = new speech.SpeechClient({
      key: process.env.SPEECH_TO_TEXT_KEY
    });
  
    const config = {
      encoding: 'FLAC',
      sampleRateHertz: 44100,
      languageCode: 'en-US',
      audioChannelCount: 2,
      diarizationConfig: {
        enableSpeakerDiarization: true,
        minSpeakerCount: 2,
        maxSpeakerCount: 2
      }
    };
  
    const [operation] = await client.longRunningRecognize({
      config: config,
      audio: {
        uri: 'gs://storage-bucket-speech-to-text/output.flac'
      }
    });
  
    const [response] = await operation.promise();
  
    const speakerTranscripts = {};
  
    response.results.forEach(result => {
      result.alternatives.forEach(alternative => {
        const speakerTag = alternative.words[0].speakerTag;
        if (!speakerTranscripts[speakerTag]) {
          speakerTranscripts[speakerTag] = [];
        }
        speakerTranscripts[speakerTag].push(alternative.transcript);
      });
    });
  
    console.log(speakerTranscripts);
  
    const storage = new Storage();
    const bucketName = 'storage-bucket-speech-to-text';
    const fileName = 'new-file-name.txt';
  
    const file = storage.bucket(bucketName).file(fileName);
    const speakerTranscriptsString = JSON.stringify(speakerTranscripts);
  
    file.save(speakerTranscriptsString, {
      metadata: {
        contentType: 'text/plain'
      }
    }, (err) => {
      if (err) {
        console.error(`Error: ${err}`);
      } else {
        console.log(`File saved to ${file.name}`);
      }
    });
  }
  
  main().catch(console.error);
  