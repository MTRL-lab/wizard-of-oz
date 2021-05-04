# Wizard of Oz chat experiment software

This software allows you to run Wizard of Oz experiments with chat interfaces. We use this software to learn and model conversations with AI agents.

This software is built using NodeJS, React and MySQL.

## Install
Make sure you run node 14.x.

Clone the source code from git and install the dependencies: 

```
git clone https://github.com:MTRL-lab/wizard-of-oz.git
npm install
```
Create and edit a local JSON configuration file:
```
vi config/local.json
```

## Production
Build the react code and start the web application.

```
npm run build
node wizard-of-oz.js
```


## Development settings

Activating video for local development requires some security settings changes on the browser.

On chrome allow unsecured video by changing: chrome://flags/#allow-insecure-localhost

Another option is to run the code with an https proxy.

Run the node application:
```
node wizard-of-oz.js
```
Run the React development server in parallel:
```
npm start
```

## License and Acknowledgments 

License: MIT

AI by Adrien Coquet from the Noun Project