# GCP-Speech-to-Text-with-Storage-Bucket-public

**Speech-to-Text Example using Google Cloud Platform Speech to Text API** 
This is an example Node.js application that uses Google Cloud's Speech-to-Text API to transcribe audio files.

**Prerequisites**\
To use this application, you will need:

A Google Cloud Platform account\
A GCP project with billing enabled\
A service account key with access to the Speech-to-Text API

**Getting a Speech-to-Text API Key**\
Open the Google Cloud Console and navigate to the Speech-to-Text API page.\
Click Enable to enable the API for your project.\
In the left-hand menu, click Credentials.\
Click Create Credentials and select Service Account Key.\
Select New Service Account and give it a name.\
Under Role, select Project > Editor.\
Click Create to create the key and download it as a JSON file.

**Installation**\
To install this application, follow these steps:

Clone this repository to your local machine.\
Install dependencies by running npm install.\
Copy your Speech-to-Text JSON key to the root directory of the application.\
Rename the JSON file to speech-to-text-key.json.\
Run the application with npm start.

**Usage**
To use this application, run the following command:

node index.js

This will transcribe the audio file located at gs://storage-bucket-speech-to-text/output.flac using the settings specified in index.js. The output will be saved to a new file named new-file-name.txt in the storage-bucket-speech-to-text bucket.

Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

License
MIT
