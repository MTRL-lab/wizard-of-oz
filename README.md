# Wizard of Oz chat experiment software

This software allows you to run Wizard of Oz experiments with chat interfaces. We use this software to learn and model conversations with AI agents.

This software is built using NodeJS, React and MySQL.

## Install

Make sure you run node 14.x.

Clone the source code from git and install the dependencies:

```sh
git clone https://github.com:MTRL-lab/wizard-of-oz.git
cd wizard-of-oz
npm install
```

Create and edit a local JSON configuration file:

```sh
vi config/local.json
```

### Configuration settings

The default configuration settings can be viewed in the `config/default.json` file. Do not change this file since it might change in the future.

| Key | Meaning |
| ----| --------|
| db | a Sequalize ORM connection string (See [documentation](https://sequelize.org/master/manual/getting-started.html)) |
| session | an express-session configuration object (See [documentation](https://github.com/expressjs/session)) |
| socketIo | SocketIO configuration object (See [documentation](https://socket.io/docs/v4/server-initialization/#Socket-IO-server-options))
| httpServer.port | Server port number |
| sequelizeRebuild | Setting this to true will rebuild the database every time the server is restarted. This will erase all the database. |
| log.level | Sets the logging level. Possible options are info, error, debug, warn, silly |

Edit the experiment consent form in : `config/consent.html`

TO have TTS and STT (speech engines) you must get access to Google's could and set up the credentials.
Import google credentials (example location)
```bash
export GOOGLE_APPLICATION_CREDENTIALS="/home/user/Downloads/service-account-file.json"
```

Run database migrations:
```bash
npx sequelize-cli db:migrate
```

## Production

Build the react code and start the web application.

```sh
npm run build
npm start
```

## Development

Activating video for local development requires some security settings changes on the browser.

On chrome allow unsecured video by changing: `chrome://flags/#allow-insecure-localhost`

Another option is to run the code with an https proxy.

Run the node application:

```
node wizard-of-oz.js
```

Run the React development server in parallel:

```
npm start-client
```

## License and Acknowledgments

MIT

AI icon by Adrien Coquet from the Noun Project under creative commons
