import log from './log.js';

export const successView = (req, res, result) => {
    res.json(result);
}

export const errorView = (req, res, error) => {
    // render the error page
    res.status(error.status || 500);
    res.json({
        'status': 'fail',
        'error': error.message
    });
}

export default (fn) => {
    return (req, res) => Promise.resolve()
        .then(() => fn(req))
        .then(response => {
            log.silly('Response successful', JSON.stringify(response));

            successView(req, res, response);
            return;
        })
        .catch((error) => {
            log.error('Response failed', JSON.stringify(error));
            errorView(req, res, error)
            return;
        });
}