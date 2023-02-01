import React, { useEffect, useState } from 'react';
import { withTranslation } from 'react-i18next';
import { Navigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import i18n from "i18next";

import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
// import CardActions from '@mui/material/CardActions';
// import Artifact from '../Task/Artifact';


import api from '../../services/api';

// eslint-disable-next-line no-undef
const imagesPath = process.env.REACT_APP_SERVER_MEDIA


function BaseIdea({ t, task }) {


    const [artifacts, setArtifacts] = useState([])
    const [nextPage, setNextPage] = useState(false)

    useEffect(() => {

        api
            .get(`artifacts/?selected=1&translateTo=${i18n.language}&ProjectId=${task.ProjectId}&TaskBlockId=${(task.TaskBlockId - 2)}`)
            .then(artifacts => {

                const data = []
                // get more than 1 selection
                artifacts.map(artifact => {

                    if (artifact.Selections && artifact.Selections.length > 1) {
                        data.push(artifact)
                    }

                })
                //fallback
                if (!data.length) {
                    artifacts.map(artifact => data.push(artifact))
                }
                
                // get grandparents
                const promises = data.map(artifact => (artifact.parent && artifact.parent.parentId) ?
                    api.get(`artifacts/${artifact.parent.parentId}`) :
                    Promise.resolve())

                return Promise.all(promises)
                    .then(grandparents => {
                        // assign grandparent
                        for (let i = 0; i < data.length; i++) {
                            data[i].grandparent = grandparents[i]
                        }
                        const randomOrderArray = data
                            .map(value => ({ value, sort: Math.random() }))
                            .sort((a, b) => a.sort - b.sort)
                            .map(({ value }) => value)

                        setArtifacts(randomOrderArray)
                    })
                    
            })
            .catch(e => console.error(e))

    }, [nextPage])

    const handleSubmit = (artifactId) => {

        setNextPage(`?step=4&artifactId=${artifactId}`)

    }

    if (nextPage) {
        return <Navigate to={nextPage} />
    }
    return <>
        <Typography variant="h5">{t("What do I need to do?")}</Typography>

        <Typography variant='body1' gutterBottom style={{ maxWidth: 600, marginBottom: 60 }}>
            {t("Base your new design on this design")}</Typography>


        {artifacts.map((artifact, key) => {
            return <>
                <Typography sx={{ pt: 7 }} variant="h6" gutterBottom>{t("Design")} #{artifact.id}</Typography>
                <Paper elevation={5} sx={{ marginBottom: 1,p:3}}>
                    <Grid container spacing={2} key={key}>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="body1" gutterBottom>{t("Description")}</Typography>
                            <Typography variant="body2" gutterBottom>{artifact.description}</Typography>

                            <Typography variant="body1" gutterBottom>{t("Feedback by community")}</Typography>
                            <Typography variant="body2" gutterBottom>{t("What people liked, and improvement ideas, auto-translated")}</Typography>

                            <ul>
                                {artifact.ArtifactCritiques.map((critique, key1) => {
                                    return <li key={key1}><Typography variant="body2" gutterBottom>{critique.description}</Typography></li>

                                })}
                            </ul>
                            <Button
                                variant="contained"
                                fullWidth
                                color="success"
                                onClick={() => handleSubmit(artifact.id)}
                            >{t("Develop this design")}</Button>
                        </Grid>
                        <Grid key={key} item xs={12} sm={6}>


       

                        {artifact.ArtifactUploads.map((tile, key) => {
                            return <ArtifactImage tile={tile} key={key} />
                        })}
                        {artifact.parent.ArtifactUploads.map((tile, key) => {
                            return <ArtifactImage tile={tile} key={key} />
                        })}

                        {artifact.grandparent && artifact.grandparent.ArtifactUploads.map((tile, key) => {
                            return <ArtifactImage tile={tile} key={key} />
                        })}
                         </Grid>
                    </Grid>
                </Paper>
            </>
        })}

    </>
}

BaseIdea.propTypes = {
    task: PropTypes.object,
    artifactIds: PropTypes.array,
    t: PropTypes.func
}
export default withTranslation()(BaseIdea)

const ArtifactImage = ({ key, tile }) => {
    return  <Box
            component="img"
            key={key}
            sx={{
                // height: 255,
                display: 'block',
                // maxWidth: 600,
                overflow: 'hidden',
                width: '100%',
            }}
            src={imagesPath + tile.file}
            alt="Idea"
        />
   

}

ArtifactImage.propTypes = {
    key: PropTypes.string,
    tile: PropTypes.array,
}