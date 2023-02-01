import React, { useState } from 'react';
import PropTypes from 'prop-types'
import { Navigate } from 'react-router-dom';
import { withTranslation } from 'react-i18next';

import Card from "@mui/material/Card"
import List from "@mui/material/List"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemIcon from "@mui/material/ListItemIcon"
import ListItemText from "@mui/material/ListItemText"
import CardActions from "@mui/material/CardActions"
import CardContent from "@mui/material/CardContent"
import CardHeader from "@mui/material/CardHeader"
import Typography from "@mui/material/Typography"

import LoadingButton from '@mui/lab/LoadingButton';

import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

import i18n from "i18next";
import api from '../../services/api';

const Text = ({ children }) => <Typography gutterBottom variant="body1" color="text.secondary">{children}</Typography>
Text.propTypes = {
    children: PropTypes.node
}


const MeetingTask = ({ task,t }) => {

    const [done, setDone] = useState(false)
    const [loading, setLoading] = useState(false)
    // const { step, ...rest } = props;


    const locations = [
        t("Z.H.R industrial Zone management company (conference room)"),
        t("Z.H.R Industrial Zone, Rosh Pinna")
    ]
    
    const subject = t('Open Discussion Meeting')
    const summary = t('meeting_summary')
    const start = new Date('May 16, 2022 17:00 GMT+03:00')
    const end = new Date('May 16, 2022 19:00 GMT+03:00')
    const meeting = {
        start,
        end,
        summary:subject,
        description: summary,
        location: locations.join(','),
        url: 'http://architasker.net',
        subject
    
    }

    const timeZoneCalc = (date) => {
        var userTimezoneOffset = date.getTimezoneOffset() * 60000;
        return new Date(date.getTime() - userTimezoneOffset);
    }

    const confirm = () => {

        setLoading(true)

        //calculate time zones
        
        const newMeeting = meeting
        newMeeting.start = timeZoneCalc(meeting.start)
        newMeeting.end = timeZoneCalc(meeting.end)

        return api
            .post('/meeting', Object.assign({}, newMeeting, { taskId: task.id }))
            .then(() => api.patch(`tasks/${task.id}`, { status: 'done' }))
            .then(() => {
                setDone(true)
            })
            .catch((error) => {
                setLoading(false)
                console.error(error);
            });
    }

    const timeOptions =  { timeStyle:'short'}
    if (done) {
        return <Navigate to="/" />
    }


    return <Card>
        <CardHeader
            title={meeting.subject}
        ></CardHeader>
        <CardContent>
            <Text>
                {summary}
            </Text>
            
            <List>
                <ListItemButton>
                    <ListItemIcon>
                        <LocationOnIcon />
                    </ListItemIcon>
                    <ListItemText primary={locations[0]} secondary={locations[1]} />
                </ListItemButton>

                <ListItemButton>
                    <ListItemIcon>
                        <AccessTimeIcon />
                    </ListItemIcon>
                    <ListItemText primary={
                        meeting.start.toLocaleDateString(i18n.language, { 
                            weekday: 'long', 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                            })} 
                            secondary={
                                `${meeting.start.toLocaleTimeString(i18n.language,timeOptions)}-${meeting.end.toLocaleTimeString(i18n.language,timeOptions)}
                                `
                            } />
                </ListItemButton>
            </List>
        </CardContent>
        <CardActions>

            <LoadingButton
                onClick={confirm}
                variant="contained"
                type="submit"
                fullWidth
                color='success'
                loading={loading}
                loadingIndicator={t("Loading...")}
            >{t("Confirm attendance")}</LoadingButton>
        </CardActions>

    </Card>
};

MeetingTask.propTypes = {
    step: PropTypes.any,
    task: PropTypes.object,
    t: PropTypes.func
}


export default withTranslation()(MeetingTask);
