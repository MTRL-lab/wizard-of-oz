import Participant from "../models/Participant.js"

export const auth = (req, res, next) => {
    if (!req.session.user) {
        return res.status(401).send({message: 'Must be signed in'});
    }
    return next();
};

export const authAdmin = (req, res, next) => {
    if (!req.session.user) {
        return res.status(401).send({message: 'Must be signed in'});
    }

    Participant.findByPk(req.session.user).then(user => {
        if (user.admin != 1) {
            return res.status(403).send({message: 'Must be admin'});
        }
        next();
    });
};

export const addAuthor = (req, res, next) => {
    if (Array.isArray(req.body)) {
        req.body.map((item, i) => (req.body[i].AccountId = req.session.user));
    } else if (!req.body.AccountId) {
        req.body.AccountId = req.session.user;
    }

    next();
};


