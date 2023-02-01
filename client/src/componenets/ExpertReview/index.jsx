import React, { useEffect, useState } from 'react';
import { withTranslation } from 'react-i18next';

import Grid from "@mui/material/Grid"
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Radio from "@mui/material/Radio";
import FormControlLabel from "@mui/material/FormControlLabel";

import api from '../../services/api';
import Button from '@mui/material/Button';

// eslint-disable-next-line no-undef
const imagesPath = process.env.REACT_APP_SERVER_MEDIA
const isImage = (fileName) => {
    const lowerFileName = fileName.toLowerCase()
    return lowerFileName.endsWith('.png') || lowerFileName.endsWith('.jpg') || lowerFileName.endsWith('.jpeg')
}

const stageHash = {
    Control: 2,
    CreateModel: 2,
    CreateSchema: 1,
    CreateSketch: 0,
}

function RatingScale(props) {
    const change = (index, value) => {
        props.onChange(index, value);
    };

    const values = [0, 1, 2, 3, 4].map(value => ({
        label: value + 1,
        value
    }))



    return values.map((item, i) => {
        return (
            <FormControlLabel
                key={i}
                value={item.value}
                required={true}
                control={
                    <Radio
                        onChange={() => change(props.question, item.value)}
                        checked={props.value === item.value}
                        value={item.value}
                    />
                }
                label={item.label}
                labelPlacement="end"
            />
        );
    });
}

const score = (rating) => {
    console.log(rating)
    return rating.reduce((acc, item) => acc + ((item ? item : 0) + 1) * 2, 0) / rating.length
}

const brief = {
    'Function': [
        'Versatile that meets the needs of its users today and into the future',
        'Private offices, production spaces of various sizes, collaborative workspaces',
        'Common space(s) that allows people to meet and communicate',
        'Auditorium (concert and/or conference hall)',
        'Your score',
    ],
    'Aestetic': [
        'Harmonious relationship with nature (nature entering the building)',
        'Respectful of its surroundings',
        'Allow nature to be visible from the inside',
        'Iconic, with a clear and memorable shape',
        'Space that is highly accessible and inviting, and innovative',
        'Your score',
    ]
}


const ExpertReview = () => {
    const [artifacts, setArtifacts] = useState([])
    const [current, setCurrent] = useState(-1)
    const [group, setGroup] = useState(-1)
    const [rating, setRating] = useState([])
    const [stage, setStage] = useState(0)

    useEffect(() => {

        api
            .get(`artifacts/`)
            .then(artifacts => {

                // group
                const grouped = artifacts.reduce((acc, item) => {
                    const index = stageHash[item.kind]
                    if (!acc[index]) acc[index] = [];
                    acc[index].push(item)
                    return acc
                }, [])

                grouped.map(group => group.sort(() => Math.random() - 0.5))
                setArtifacts(grouped)
            })
            .catch(e => console.error(e))
    }, [artifacts.length])

    const progress = () => {
        window.scrollTo(0, 0)
        if (group > -1 && current > -1 && !artifacts[group][current + 1]) {
            setCurrent(-1)
            setGroup(-1)
            setStage(0)
            setRating([])
        }
        else {
            setCurrent(current + 1)
            setRating([])
        }
    }

    const handleToggle = (index, value) => {

        rating[index] = value;
        setRating([...rating]);
    };

    // const remove = (id) => {
    //     api
    //         .patch(`artifacts/upload/${id}`, { status:2 })
    // }

    let index =-1;
    return <Grid container spacing={2}>
        {!stage && !!artifacts.length && artifacts.map((group, groupId) => {
            return <Button key={groupId} onClick={() => { setGroup(groupId); setStage(1) }} > Group {groupId}</Button>
        })}
        {!!stage && current == -1 && <>
            <Typography variant='h4'>Review the designs</Typography>

            {artifacts[group].map((artifact, i) => {
                return <Grid key={i} item xs={4}><Paper elevation={5} sx={{ marginBottom: 1 }}>
                    {isImage(artifact.ArtifactUploads[0].file) && artifact.ArtifactUploads[0].status == 1 ?
                        <Box
                            component="img"
                            sx={{
                                // height: 255,
                                display: 'block',
                                // maxWidth: 600,
                                overflow: 'hidden',
                                width: '100%',
                            }}
                            src={imagesPath + artifact.ArtifactUploads[0].file}
                            alt="Idea"
                        />
                        : <></>
                    }

                </Paper></Grid>
            })}
            <Button style={{ width: '100%' }} onClick={() => setCurrent(current + 1)} variant="contained">Start</Button>

        </>
        }
        {!!stage && current > -1 && <Grid item
            xs={12}
            style={{ marginBottom: 20 }}
        >
            <Typography variant='h4'>Design #{artifacts[group][current].id}</Typography>
            {artifacts[group][current].ArtifactUploads.map((tile, key) => {
                return <><Paper elevation={5} key={key} sx={{ marginBottom: 1 }}>
                    {tile.status==1 && isImage(tile.file) ? <>
                        {/* <Button onClick={() => remove(tile.id)}>Remove</Button> */}
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
                    </>
                        : <></>

                    }


                </Paper>
                </>
            })}
            <Paper elevation={5}>
                {artifacts[group][current].description && <Typography variant="body1" sx={{ p: 2 }}>{artifacts[group][current].description}</Typography>}
            </Paper>
            
            {Object.keys(brief).map((question, i1) => {

                return <>
                    <Typography variant="h6" sx={{ p: 2 }}>{question}</Typography>
                    <Paper elevation={5} key={i1} sx={{ p: 2 }}>
                        {brief[question].map((item, i) => {
                            index++
                            return (
                                <div key={i} style={{ display: "flex" }}>

                                    <div style={{ flex: 1, marginTop: 8, marginBottom: 8 }}>{item}</div>
                                    <RatingScale

                                        name={"rating"}
                                        value={rating[index]}
                                        question={index}
                                        onChange={handleToggle}
                                    />
                                </div>
                            )
                        }
                        )}
                    </Paper>
                </>
            })}
            <Typography variant="h6" sx={{ p: 2 }}>Design: {artifacts[group][current].id} Score: {score(rating)}</Typography>

            <Button style={{ width: '100%' }} onClick={() => progress()} variant="contained">Next Design</Button>

        </Grid>

        }
    </Grid >

}

export default withTranslation()(ExpertReview)