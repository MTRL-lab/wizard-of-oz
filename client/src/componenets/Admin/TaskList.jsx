import React, { useState, useEffect } from 'react';

// // core components
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';


import ErrorMessage from '../ErrorMessage';
import TaskTable from './TaskTable.jsx';
import { TaskNames } from '../../assets/text';
import api from '../../services/api';

// List is a simple bare componenet for basic admin

const TaskAdmin = () => {
    const [data, setData] = useState({ participants: [], artifacts: [], tasks: [] })
    const [form, setForm] = useState({
        ParticipantId: "",
        kind: "",
        ArtifactId: "",
        TaskBlockId: 0
    })
    const [error, setError] = useState(false)
    const [selectedRows, setSelectedRows] = useState([])

    useEffect(() => {
        api.get(`/tasks/`)
            .then(tasks => {

                const projectId = tasks[0].ProjectId
                return Promise.all([
                    api.get('/participants', { ProjectId: projectId }),
                    api.get('/artifacts', { ProjectId: projectId })
                ])
                    .then(([participants, artifacts]) => setData({ projectId, participants, artifacts, tasks }))
            })
            .catch(error => errorHandler(error));
    }, [data.tasks.length])


    const handleChange = event => {
        console.log(event.target)
        form[event.target.name] = event.target.value;
        setForm({ ...form });
    };

    const onAdd = () => {
        const { ParticipantId, kind, ArtifactId, TaskBlockId } = form;
        api.post('/tasks/', {
            ParticipantId,
            kind,
            ProjectId: data.projectId,
            ArtifactId,
            TaskBlockId: TaskBlockId,
        })
            .then(() => {
                data.tasks = []
                setData({ ...data })
            })
            .catch(e => errorHandler(e));
    }

    const onDelete = () => {

        const promisses = selectedRows.map(taskId => api.del('/tasks/' + taskId))

        return Promise.all(promisses)
            .then(() => {
                data.tasks = []
                setSelectedRows([])
                setData({ ...data })
            })
            .catch(error => errorHandler(error));
    }

    const onSelectionModelChange = (data) => setSelectedRows(data)

    const errorHandler = (error) => {
        setError(error)
    }
    console.log(selectedRows, form)
    return (
        <Container>

            <TaskTable
                tasks={data.tasks}
                participants={data.participants}
                artifacts={data.artifacts}
                onSelectionModelChange={onSelectionModelChange}
                onError={errorHandler} />

            <Paper componenet="form" autoComplete="off">

                <Button onClick={onDelete} >Dellete</Button>
                <FormControl>

                    <InputLabel htmlFor="TaskBlockId">TaskBlockId</InputLabel>
                    <TextField
                        fullWidth
                        value={form.TaskBlockId}
                        onChange={handleChange}
                        name='TaskBlockId'
                        id='TaskBlockId'
                    />

                </FormControl>
                <FormControl>

                    <InputLabel htmlFor="ParticipantId">User</InputLabel>
                    <Select
                        fullWidth
                        value={form.ParticipantId}
                        onChange={handleChange}
                        name='ParticipantId'
                        id='ParticipantId'
                    >
                        <MenuItem value="">
                            <em>Participatnt</em>
                        </MenuItem>
                        {data.participants &&
                            data.participants.map(account => (
                                <MenuItem
                                    value={account.id}
                                    key={account.id}
                                >
                                    {account.fname} {account.lname}
                                </MenuItem>
                            ))}
                    </Select>
                </FormControl>
                <FormControl>
                    <InputLabel htmlFor="kind">Kind</InputLabel>
                    <Select
                        fullWidth
                        value={form.kind}
                        onChange={handleChange}
                        name='kind'
                        id='kind'

                    >
                        <MenuItem value="">
                            <em>Kind</em>
                        </MenuItem>

                        {TaskNames &&
                            Object.keys(TaskNames).map(key => (
                                <MenuItem value={key} key={key}>
                                    {TaskNames[key]}
                                </MenuItem>
                            ))}
                    </Select>
                </FormControl>
                <FormControl>
                    <InputLabel htmlFor="ArtifactId">Based on</InputLabel>
                    <Select
                        fullWidth
                        onChange={handleChange}
                        name='ArtifactId'
                        id='ArtifactId'
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        {data.artifacts &&
                            data.artifacts.map(artifact => (
                                <MenuItem
                                    value={artifact.id}
                                    key={artifact.id}
                                >
                                    {artifact.id}
                                </MenuItem>
                            ))}
                    </Select>
                </FormControl>
                <Button onClick={onAdd}>
                    Add task
                </Button>
            </Paper>
            <ErrorMessage
                error={error}
                action={() => setError(false)}
            />

        </Container>
    );
}



export default TaskAdmin;
