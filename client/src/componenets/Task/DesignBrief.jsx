import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';

import { PropTypes } from 'prop-types';
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import SimpleMap from "../SimpleMap"
import NextButton from "../Task/NextButton"

import api from '../../services/api';


const parseString = (str) => {
    if (typeof str === 'string')
        return str.split('\n')
}


class DesignBrief extends Component {

    state = {
        location: null,
        budget: null,
        name: null,
        cards: []
    }

    componentDidMount() {
        const { task,t } = this.props;

        const { ProjectId } = task

        api.get(`project/${ProjectId}`)
            .then(project => {
                const { location, budget, name } = project
                const [lat, lon] = location.split(',');

                function createMarkup() {
                    return { __html: project.objectives };
                }
                const cards = [
                    {
                        title: t('Design Brief'),
                        content: <div dangerouslySetInnerHTML={createMarkup()}></div>

                    },
                    {
                        title:  t('Background'),
                        content: parseString(project.projectBackground)
                            .map((para, i) => <Typography variant="body1" key={i}>{para}</Typography>)
                    },
                    {
                        title:  t('Client'),
                        content: parseString(project.clientBackground)
                            .map((para, i) => <Typography variant="body1" key={i}>{para}</Typography>)
                    },

                    {
                        title:  t('The Site'),
                        image: <SimpleMap lat={parseFloat(lat)} lng={parseFloat(lon)} zoom={15} />,
                        content: parseString(project.siteBackground)
                            .map((para, i) => <Typography variant="body1" key={i}>{para}</Typography>)
                    },
                    {
                        title:  t('Users'),
                        content: parseString(project.audience)
                            .map((para, i) => <Typography variant="body1" key={i}>{para}</Typography>)
                    }
                ]
                this.setState({ location, budget, name, cards })

            })
    }

    render() {
        const { cards } = this.state;

        if (!cards.length) {
            return <></>
        }
        return <>
            <Grid container spacing={2}>
                <Grid item md={6}>
                    <Card >
                        <CardHeader title={cards[0].title}></CardHeader>
                        <CardMedia>{cards[0].image}</CardMedia>
                        <CardContent>{cards[0].content}</CardContent>
                    </Card>
                </Grid>
                <Grid item md={6}>
                    <Card style={{marginBottom:10}}>
                        <CardHeader title={cards[1].title}></CardHeader>
                        <CardMedia>{cards[1].image}</CardMedia>
                        <CardContent>{cards[1].content}</CardContent>
                    </Card>
                    <Card style={{marginBottom:10}}>
                        <CardHeader title={cards[2].title}></CardHeader>
                        <CardMedia>{cards[2].image}</CardMedia>
                        <CardContent>{cards[2].content}</CardContent>
                    </Card>
                    <Card style={{marginBottom:10}} >
                        <CardHeader title={cards[3].title}></CardHeader>
                        <CardMedia>{cards[3].image}</CardMedia>
                        <CardContent>{cards[3].content}</CardContent>
                    </Card>
                </Grid>


            </Grid>
            <NextButton />
        </>
    }
}

DesignBrief.propTypes = {
    task: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
}


export default withTranslation()(DesignBrief);