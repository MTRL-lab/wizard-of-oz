import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

// // core components
import Grid from '@mui/material/Grid';

import ErrorMessage from '../ErrorMessage';
import TaskTable from './TaskTable.jsx';

import api from '../../services/api';



const TaskAdmin = () => {
    const [data, setData] = useState({participants:[],artifacts:[],tasks:[]})
    const [error, setError] = useState(false)

    const params = useParams();

    useEffect(() => {
        api.get(`/tasks/?TaskBlockId=${params.TaskBlockId}`)
            .then(tasks => {
                const projectId = tasks[0].ProjectId
                return Promise.all([
                    api.get('/participants', { ProjectId: projectId }),
                    api.get('/artifacts', { ProjectId: projectId })
                ])
                    .then(([participants, artifacts]) => setData({ participants, artifacts, tasks }))
            })
            .catch(error => errorHandler(error));
    }, [data.tasks.length])



    const errorHandler = (error) => {
        setError(error)
    }

    return (
        <Grid container>
            <Grid item xs={12} md={12}>
                <TaskTable
                    tasks={data.tasks}
                    participants={data.participants}
                    artifacts={data.artifacts}
                    onError={errorHandler} />
            </Grid>
            <ErrorMessage
                error={error}
                action={() => this.setState({ error: false })}
            />
        </Grid>
    );
}



export default TaskAdmin;
