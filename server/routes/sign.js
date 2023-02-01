import express from "express";
import wrapper from "../lib/route_wrapper.js";
import Participant from "../models/Participant.js";
import ParticipantRole from "../models/ProjectRole.js"
import Task from "../models/Task.js";

import initDb from "../lib/db.js";
import { auth } from '../middleware/account.js'
import { NotFoundError, BadRequestError, NotAllowedError, ConflictError } from '../lib/errors.js'

const { db } = initDb()

const api = express.Router();

function delay(t, v) {
    return new Promise(function (resolve) {
        setTimeout(resolve.bind(null, v), t)
    });
}

// agree to participate
api.post("/up/", wrapper((req) => {

    const possibleRoles = ['client', 'designer']
    const {
        fname, lname, email, location, gender,
        connection, year, task = false,
        education = '', experience = '', live = '', role = "client" } = req.body;

    if (!possibleRoles.includes(role)) {
        throw BadRequestError("No such role")
    }

    return Participant.generateCode()

        .then(password => Participant.create({
            fname, lname, email, location, connection,
            gender, year, password, education, experience, live
        }))

        .then(participant => {
            const ParticipantId =  participant.id
            return ParticipantRole.create({
                kind:role,
                ParticipantId,
                ProjectId:1
            })
                .then(() => Participant.sendToken(participant))
                .then(() => {
                    if (task) {
                        const taskData = Object.assign({}, task, {
                            ParticipantId
                        })
                        console.log(taskData, task)
                        return Task.create(taskData)
                    }
                    else {
                        return Promise.resolve({ sucess: true })
                    }
                })
        })
        .catch(e => {
            if (e && e.errors && e.errors[0] && e.errors[0].message == 'email must be unique') {
                throw new ConflictError('Email already registered')
            }

            throw e
        })
})
);

// agree to participate
api.post("/consent/", auth, wrapper((req) => {

    const data = req.body;
    const user = req.session.user
    console.log(data, user)
    return Participant.findByPk(user)
        .then(participant => participant.set({ consent: data }))
        .then(participant => participant.save())
    // .then(()=>{true})

})
);
api.post("/sendtoken/", wrapper((req) => {

    const { email } = req.body;

    return Participant.findOne({
        attributes: ['id', 'password', 'email'],
        where: {
            email
        }
    })
        .then(participant => {
            if (!participant) {
                throw new NotFoundError('Email not found')
            }

            return Participant.generateCode()
                .then(password => {
                    participant.password = password
                    return participant.save()
                })
        })
        .then(saved => {
            return Participant.sendToken(saved)
        })

})
);
api.post("/in/", wrapper((req) => {
    const { email, token = '' } = req.body;

    return Participant.findOne({
        attributes: ['id', 'password'],
        where: {
            email
        }
    })
        .then(user => delay(2000, user))
        .then(user => {
            if (!user) {

                throw new NotFoundError('Incorrect email.');
            }

            if (user.password != token) {
                throw new BadRequestError('Incorrect token.');
            }
            req.session.user = user.id;
            return user;
        });
}))

api.post("/out/", wrapper(req => {
    req.session.user = null;
    return Promise.resolve({ success: true });
}));


api.get('/me', wrapper((req) => {
    if (!req.session.user) {
        throw new NotAllowedError('Not signed in')
    }
    return Participant.findByPk(req.session.user);

}));

export default api;
