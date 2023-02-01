import ArtifactCritique from './ArtifactCritique.js'
import ArtifactUpload from './ArtifactUpload.js'
import Artifact from './Artifact.js'
import Brief from './Brief.js'
import Message from './Message.js'
import Participant from './Participant.js'
import ProjectRole from './ProjectRole.js'
import Project from './Project.js'
import TaskBlock from './TaskBlock.js'
import Task from './Task.js'
import Selection from "./Selection.js"


Brief.belongsTo(Participant);
Brief.belongsTo(TaskBlock);
Brief.belongsTo(Task);
Brief.belongsTo(Artifact);

// associations can be defined here
Artifact.belongsTo(Participant);
Artifact.belongsTo(Project);
Artifact.belongsTo(Task);
Artifact.hasMany(ArtifactCritique);
Artifact.hasMany(ArtifactUpload);
Artifact.hasMany(Selection);


ArtifactUpload.belongsTo(Artifact);
ArtifactUpload.belongsTo(Participant);


ArtifactCritique.belongsTo(Participant);
ArtifactCritique.belongsTo(Artifact);
ArtifactCritique.belongsTo(Task);

Participant.belongsToMany(Project, {
    through: {
        model: ProjectRole,
        unique: false,
    },
    // scope: {designer
    //   taggable: 'participates'
    // },
    // constraints: true,
});
Project.belongsTo(Participant, { as: 'owner' });
Project.hasMany(Task);
Project.hasMany(TaskBlock);
Project.hasMany(ProjectRole);
Project.hasMany(Artifact);
Project.belongsToMany(Participant, {
    through: {
        model: ProjectRole,
        unique: false,
        // scope: {
        //   taggable: 'participants'
        // }
    },
    // constraints: false,
});

Task.belongsTo(Project);
Task.belongsTo(TaskBlock);
Task.belongsTo(Participant);
Task.hasMany(Artifact);
Task.belongsTo(Artifact, { constraints: false });
Task.hasMany(ArtifactCritique);

TaskBlock.belongsTo(Project);
TaskBlock.hasMany(Task);

Selection.belongsTo(Participant);
Selection.belongsTo(Artifact);
Selection.belongsTo(Project);
Selection.belongsTo(TaskBlock)

Message.belongsTo(Participant)
Message.belongsTo(Task)

export {
    ArtifactCritique, ArtifactUpload, Artifact,
    Participant, Message, Brief, ProjectRole, 
    Project, TaskBlock, Task,Selection
}