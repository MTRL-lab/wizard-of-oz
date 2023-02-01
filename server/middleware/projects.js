const requestWrapper = require('../lib/requestWrapper');
const {
    Project,
    ProjectRequirement,
    ProjectLink,
    ProjectRole,
} = require('../models');

const listProject = requestWrapper(req => Project.findAll());

const singleProject = requestWrapper(req => {
    const {
        params: {ProjectId},
    } = req;

    return Project.findById(ProjectId, {
        include: [ProjectRequirement, ProjectLink],
    });
});

const createRole = requestWrapper(req => {
    const {
        params: {ProjectId},
        body: {AccountId, role},
    } = req;

    return ProjectRole.create({
        AccountId,
        kind: role,
        ProjectId,
    });
});
const deleteRole = requestWrapper(req => {
    const {
        params: {ProjectId},
        body: {AccountId, role},
    } = req;

    return ProjectRole.findAll({
        where: {
            AccountId,
            kind: role,
            ProjectId,
        },
    }).then(roles => {
        return roles.map(role => role.destroy());
    });
});
module.exports = {
    singleProject,
    listProject,
    createRole,
    deleteRole,
};
