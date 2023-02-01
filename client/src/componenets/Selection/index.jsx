import React, { Fragment, useEffect, useState } from 'react';
import { withTranslation } from 'react-i18next';

import PropTypes from "prop-types"
import Artifact from '../Task/Artifact';
import Grid from "@mui/material/Grid"
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';

import api from '../../services/api';
import { Navigate } from 'react-router-dom';


const Selection = ({ task, artifactIds, t }) => {

    const [artifacts, setArtifacts] = useState([])
    const [nextPage, setNextPage] = useState(false)

    useEffect(() => {
        if (!artifacts || artifacts.length)
            return

        api
            .get(`artifacts/?ProjectId=${task.ProjectId}&TaskBlockId=${(task.TaskBlockId - 1)}`)
            .then(artifacts => {

                const data = []
                artifacts.map(artifact => {
                    if (artifactIds.includes(artifact.id)) {
                        data.push(artifact)
                    }
                })

                setArtifacts(data)
            })
            .catch(e => console.error(e))
    }, [nextPage])



    const handleSubmit = (artifactId) => {
        api.post('artifacts/select', {
            checked: [artifactId],
            taskId: task.id
        })
            .then(() => {
                setNextPage(`?step=4&artifactId=${artifactId}`)
            })
    }
    if (nextPage) {
        return <Navigate to={nextPage} />
    }
    return <Fragment>
        <Typography variant="h6">{t("What do I need to do?")}</Typography>

        <Typography variant='body1' gutterBottom style={{ maxWidth: 600, marginBottom: 60 }}>
            {t("select_description")}</Typography>

        <Grid container spacing={2}>
            {artifacts.map(artifact => {
                artifact.description = '';
                return (
                    <Grid item
                        xs={12}
                        sm={6}
                        md={4}
                        key={'artifact_' + artifact.id}
                        style={{ marginBottom: 20 }}
                    >
                        <Paper elevation={5}>
                            <Artifact artifact={artifact} />
                            {artifact.description && <Typography variant="body2" sx={{ p: 2 }}>{artifact.description}</Typography>}
                            <CardActions>
                                <Button
                                    variant="contained"
                                    fullWidth
                                    color="success"
                                    onClick={() => handleSubmit(artifact.id)}
                                >{t("Choose design")}</Button>
                            </CardActions>
                        </Paper>
                    </Grid>
                );
            })}
        </Grid>


    </Fragment>
}

Selection.propTypes = {
    task: PropTypes.object,
    artifactIds: PropTypes.array,
    t: PropTypes.func
}
export default withTranslation()(Selection)