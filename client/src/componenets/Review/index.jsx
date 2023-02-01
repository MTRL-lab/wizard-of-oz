import React, { useEffect, useState } from 'react';
import PropTypes from "prop-types"
import { withTranslation } from 'react-i18next';
import i18n from "i18next";
import Grid from "@mui/material/Grid"
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

import AppBar from "@mui/material/AppBar"
import Toolbar from '@mui/material/Toolbar';
import CircularProgress from '@mui/material/CircularProgress';

import api from '../../services/api';
import { Navigate } from 'react-router-dom';
import BigBox from '../BigBox';

// eslint-disable-next-line no-undef
const imagesPath = process.env.REACT_APP_SERVER_MEDIA

// const iframe = {
//     width: '100%',
//     height: '500px',
// };

const isImage = (fileName) => {
    const lowerFileName = fileName.toLowerCase()
    return lowerFileName.endsWith('.png') || lowerFileName.endsWith('.jpg') || lowerFileName.endsWith('.jpeg')
}

const isSketchUp = (url) => {
    return url.startsWith('https://3dwarehouse.sketchup.com/embed/')
}

const Review = ({ task, t }) => {

    const [artifacts, setArtifacts] = useState([])
    const [likes, setLikdes] = useState([])
    const [artifactIndex, setArtifactIndex] = useState(0)

    useEffect(() => {
        if (!artifacts || artifacts.length)
            return

        api
            .get(`artifacts/?ProjectId=${task.ProjectId}&active=1&TaskBlockId=${(task.TaskBlockId - 1)}&translateTo=${i18n.language}`)
            .then(data => {

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

    }, [artifacts.length])

    const handleLike = (artifactId) => {
        likes.push(artifactId)

        setLikdes([...likes])
        setArtifactIndex(artifactIndex + 1)
    }

    const handleDislike = () => {
        setArtifactIndex(artifactIndex + 1)

    }


    if (!artifacts.length) {
        return <CircularProgress />
    }
    if (!artifacts[artifactIndex]) {
        if (likes.length)
            return <Navigate to={`?step=3&artifactIds=${likes.join(',')}`} />
        else
            return <BigBox
                headline={t("No more designs, and you did not like any design")}
                description={t("Refresh to try again")} />
    }

    const artifact = artifacts[artifactIndex];

    return <Grid container spacing={2}>
        <Grid item xs={12} md={12}>
            {artifact.ArtifactUploads.map((tile, key) => {

                return isSketchUp(tile.file) ?
                    <iframe key={key} src={tile.file} frameBorder="0" scrolling="no" marginHeight="0"
                        marginWidth="0" width="100%" height="600" allowFullScreen></iframe> :
                    <></>
            })
            }
        </Grid>
        <Grid item xs={12} md={6}>
            <Typography variant="h5">{t("What do I need to do?")}</Typography>
            <Typography variant='body1' gutterBottom>
                {t("review_description")}
            </Typography>
            <Typography variant="h5" gutterBottom>{t("Description")} (#{artifact.id})</Typography>
            <Typography variant="body1" gutterBottom>{artifact.description}</Typography>


            <AppBar component="nav" position="fixed" color="primary" sx={{ top: 'auto', bottom: 0 }}>
                <Toolbar direction="row" spacing={2}>
                    <Button variant='contained' color="success" onClick={() => handleLike(artifact.id)}>
                        {t("I like it")}</Button> {" "}
                    <Button variant='contained' color="error" onClick={() => handleDislike()}>
                        {t("I do not like it")}</Button>
                </Toolbar>
            </AppBar>

        </Grid>

        <Grid item xs={12} md={6}>
            <Typography variant="h5" gutterBottom>{t("New design")}</Typography>
            <Typography variant="body1" gutterBottom>{t("The following are new designs for your review (click to enlarge)")}</Typography>


            {artifact.ArtifactUploads.map((tile, key) => {
                return <Paper elevation={5} key={key} sx={{ marginBottom: 1 }}>


                    {isImage(tile.file) ?
                        <a href={imagesPath + tile.file}
                            rel="noreferrer" target="_blank"
                            key={'ArtifactUploads' + tile.id}><Box
                                component="img"
                                sx={{
                                    // height: 255,
                                    display: 'block',
                                    // maxWidth: 600,
                                    overflow: 'hidden',
                                    width: '100%',
                                }}
                                src={imagesPath + tile.file}
                                alt="Idea"
                            /></a>
                        : <></>
                    }

                </Paper>

            })}
            {artifact.parent && artifact.parent.ArtifactUploads && <>
                <Typography variant="h6" gutterBottom>{t("Original design")}</Typography>
                <Typography variant="body1" gutterBottom>{t("The new design is based on this one")}</Typography>

                <Grid container spacing={2}>

                    {artifact.parent && artifact.parent.ArtifactUploads && artifact.parent.ArtifactUploads.map(upload => {
                        return <Grid item xs={12} key={'ArtifactUploads' + upload.id}>
                            <Paper elevation={5} sx={{ marginBottom: 1 }}>
                                <Box
                                    component="img"
                                    sx={{
                                        display: 'block',
                                        overflow: 'hidden',
                                        width: '100%',
                                    }}
                                    src={imagesPath + upload.file}
                                    alt="Idea"
                                /></Paper></Grid>

                    })}

                    {artifact.grandparent && artifact.grandparent.ArtifactUploads && artifact.grandparent.ArtifactUploads.map(upload => {
                        return <Grid item xs={12} key={'ArtifactUploads' + upload.id}>
                            <Paper elevation={5} sx={{ marginBottom: 1 }}>
                                <Box
                                    component="img"
                                    sx={{
                                        display: 'block',
                                        overflow: 'hidden',
                                        width: '100%',
                                    }}
                                    src={imagesPath + upload.file}
                                    alt="Idea"
                                /></Paper></Grid>

                    })}
                </Grid>
            </>
            }

        </Grid>

    </Grid>
}

Review.propTypes = {
    task: PropTypes.object,
    t: PropTypes.func

}
export default withTranslation()(Review)

