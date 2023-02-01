import config from 'config';

export default {
    development : config.get('db'),
    production : config.get('db'),
    test : config.get('db')
}