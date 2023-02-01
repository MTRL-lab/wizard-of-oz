import React from "react";
import PropTypes from "prop-types"
import { withTranslation } from 'react-i18next';

import { Link } from "react-router-dom"
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import sketchImg from "../../assets/img/sketch/sketch_example2.jpg"
import critImg from "../../assets/img/critique/example.jpg"
import meetingImg from "../../assets/img/meeting/example.jpg"
import requirementsImg from "../../assets/img/requirements/example.png"
import schemsImg from "../../assets/img/schema.jpg"
import modelImg from "../../assets/img/model/3dmodel_example6.jpg"
import FinalMeetingImg from "../../assets/img/meeting/FinalMeeting.png"
import CreatePlanImg from "../../assets/img/plan/exterior-elevation-plan.png"

const TaskCard = (props) => {

    const {t} = props;

    const content = {
        ExpertReview: {
            name: 'Expert Review',
            img: sketchImg,
            description: 'Admin task'
        },
        CreateSketch: {
            name: t('Create Concept Sketch'),
            img: sketchImg,
            description: t('Make a napkin sketch that conveys the main design ideas')
        },
        Critique: {
            name: t('Give Feedback'),
            img: critImg,
            description: t('Select the design you like and tell us what you think')
        },
        Meeting: {
            name: t('Open Discussion Meeting'),
            img: meetingImg,
            description: t('RSVP and have your voices heard at the the Open Discussion Meeting'),
            cta: t('More Details')
        },
        CoDesign: {
            name: t('Collaborative Design Meeting'),
            img: meetingImg,
            description: t('RSVP and express your ideas together with the community and architects'),
            cta: t('More Details')
        },
        Requirements: {
            name: t('Discuss design requirements'),
            img: requirementsImg,
            description: t(`Discuss the project's design requirements using our chatbot - Zaha AI`),
        },
        CreateSchema: {
            name: t('Create a Schema Sketch'),
            img: schemsImg,
            description: t(`Produce a schematic plan and section.`),
        },
        CreateModel: {
            name: t('Create a 3D model'),
            img: modelImg,
            description: t(`Produce a SketchUp model.`),
        },
        CreatePlan: {
            name: t('Produce an Autocad plan'),
            img: CreatePlanImg,
            description: t(`Integrate the interior and experior design into a set of Autocad drawings.`),
        },
        FinalMeeting: {
            name: t('Project Summary Meeting'),
            img: FinalMeetingImg,
            description: t(`This is the final and concluding meeting were we select the final design and reflect on the process.`),
        },
    
    }
    
    return <Card sx={{ maxWidth: 345 }}>
        <CardMedia
            component="img"
            alt=""
            height="140"
            image={content[props.kind].img}
        />
        <CardContent>
            <Typography gutterBottom variant="h5" component="div">
                {content[props.kind].name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
                {content[props.kind].description}
            </Typography>
        </CardContent>
        <CardActions>
            <Button size="small" component={Link} to={`/task/${props.id}`}>
                {content[props.kind].cta?content[props.kind].cta:t('Launch')}</Button>
        </CardActions>
    </Card>
}

TaskCard.propTypes = {
    kind: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    t: PropTypes.func
}

export default withTranslation()(TaskCard)
