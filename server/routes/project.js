import express from "express";
import wrapper from "../lib/route_wrapper.js";
import Project from "../models/Project.js";
import { detectAndTranslate } from '../lib/translate.js'

const api = express.Router();

api.get("/:projectId", wrapper((req) => {
    const { translateTo } = req.query;
    const { projectId } = req.params

    return Project.findByPk(projectId)
        .then(project => {

            if (!translateTo) {
                return project
            }
            const fields = ["clientBackground", "projectBackground", "objectives", "siteBackground", "audience"]
            const promises = fields.map(field =>
                detectAndTranslate(project[field], translateTo)
                    .then(newText => {
                        project[field] = newText
                        return project;
                    }))

            return Promise.all(promises)
                .then(() => project)
        })
    })
);


export default api;
