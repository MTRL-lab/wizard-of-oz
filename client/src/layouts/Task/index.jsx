import React, { useEffect, useState } from "react"
import PropTypes from "prop-types";
import { useParams, Navigate } from 'react-router-dom';
import { withTranslation } from 'react-i18next';

import Container from '@mui/material/Container';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';

import TaskNav from "../../componenets/Nav/TaskNav"
import api from '../../services/api.js';
import * as text from '../../assets/text'
import BigBox from "../../componenets/BigBox";
import ErrorMessage from '../../componenets/ErrorMessage';


import CreateSketchTask from "../../componenets/CreateSketchTask"
import CritiqueBot from "../../componenets/CritiqueBotTask"
import MeetingTask from "../../componenets/MeetingTask"
import RequirementsBotTask from "../../componenets/RequirementsBotTask"
import CoDesign from "../../componenets/MeetingTask/coDesign.jsx";
import CreateSchema from '../../componenets/CreateSchemaTask'
import CreateModel from '../../componenets/CreateModelTask'
import FinalMeeting from '../../componenets/MeetingTask/FinalMeeting.jsx'
import CreatePlan from '../../componenets/CreatePlanTask/'
import ExpertReview from '../../componenets/ExpertReview/'


const tasksComps = {
    CreateSketch:CreateSketchTask,
    Critique:CritiqueBot,
    Meeting:MeetingTask,
    Requirements:RequirementsBotTask,
    CoDesign,
    CreateSchema:CreateSchema,
    CreateModel:CreateModel,
    FinalMeeting,
    CreatePlan,
    ExpertReview
}

const isTaskInvalid = task => {
    return !task
        ? 'Task does not exist'
        : task.status === 'done'
            ? 'This task was already completed'
            : task.status == !'assinged'
                ? 'This task is not assigned'
                : false;
};


const TaskLayout = function ({t}) {
    const [task, setTask] = useState(null);
    const [error, setError] = useState(null);
    const [isDone, setDone] = useState(false);
    const params = useParams();
    const { taskId } = params;

    useEffect(() => {

       

        if (task || error) return;

        api.get(`/tasks/${taskId}`)
            .then(task => setTask(task))
            .catch(error => setError(error))
    })



    if (isDone === 1) {
        return <Navigate to="/" />;
    }

    if (error){
        if (error.response.data.error =='Missing consent') {
            return <Navigate to= {`/consent/?return=/task/${taskId}/`} />
        }
    }

    const errorMessage = isTaskInvalid(task);

    if (errorMessage) {
        return <BigBox
            headline={errorMessage}
            secondary="error"
        />
    }



    const query = new URLSearchParams(window.location.search);
    const step = query.has('step') ? parseInt(query.get('step')) : 1;
    const artifactId = query.has('artifactId') ? parseInt(query.get('artifactId')) : 1;
    const artifactIds = query.has('artifactIds') ? query.get('artifactIds').split(',').map(i => parseInt(i)) : [];


    const taskName = text.TaskNames[task.kind];

    // some tasks dont have microtasks
    const steps = text[`${task.kind}MicroTasks`]
        ? text[`${task.kind}MicroTasks`].slice()
        : [];

    if (!steps.length) console.warn(`No ${task.kind}MicroTasks`);

    const Compt = tasksComps[task.kind]

    return <>
        <TaskNav title={`Task: ${taskName}`} />
        <Container style={{ marginTop: 90, marginBottom: 70 }}>
            {!!steps.length && (
                <Stepper activeStep={step - 1} style={{ 
                    marginBottom: 30, 
                    overflowX: "auto",
                    overflowY: "hidden", 
                }}>
                    {steps.map(label => (
                        <Step key={label}>
                            <StepLabel sx={{minWidth:150}}>{t(label)}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
            )}

            <Compt task= {task} 
                step={step} setError={setError} setDone={setDone}
                artifactId={artifactId} artifactIds={artifactIds} />

            <ErrorMessage
                error={error}
                action={() => setError(false)}
            />
        </Container >
    </ >
}


TaskLayout.propTypes = {
    t: PropTypes.func,
};
export default withTranslation()(TaskLayout)