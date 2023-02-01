import React, { Component } from "react";
import PropTypes from "prop-types";
import { Navigate } from "react-router-dom"
import { withTranslation } from 'react-i18next';

import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

import Typography from "@mui/material/Typography";
import TaskCard from "./TaskCard"
import api from '../../services/api'
import BigBox from "../BigBox";

import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';

const currentStep = 4

class MyTasks extends Component {
    state = {
        me: {},
        tasks: [],
        error: false,
        step: currentStep
    }
    componentDidMount() {
        api.get('/sign/me')
            .then(me => this.setState({ me }))
            .catch(error => this.setState({ error }))
        api.get('/tasks/my')
            .then(tasks => this.setState({ tasks }))
            .catch(error => this.setState({ error }))

    }
    handleStep = (step) => () => {
        this.setState({ step });
    };
    render() {
        const { tasks, error, me, step } = this.state
        const { t } = this.props
        if (error) {
            return <Navigate to="/welcome/?lng=he" />
        }

        const steps = t('overview', { returnObjects: true }).map((row, index) => {
            if (index < currentStep) {
                row.completed = true
            }
            return row
        })

        return <div style={{ marginTop: 50, marginBottom: 50 }}>

            <Typography variant="h5" gutterBottom>{t("Hello")} {me.fname}</Typography>
            <Card>
                <CardContent>
                    <Typography variant="h6" gutterBottom>{t("Project overview and current state")}</Typography>

                    <Stepper sx={{ paddingBottom: 4, paddingTop: 2 }} nonLinear activeStep={step}>
                        {steps.map(({ label, completed }, index) => (
                            <Step key={index} completed={completed}>
                                <StepButton color="inherit" onClick={this.handleStep(index)}>
                                    {label}
                                </StepButton>
                            </Step>
                        ))}
                    </Stepper>
                    <Typography variant="body2" color="text.secondary" gutterBottom>{steps[step].description}</Typography>
                </CardContent>
            </Card>


            {!tasks.length && (
                <BigBox
                    headline={t("No active tasks")}
                    description={t("Thank you for taking part in the project. Here you can participate by completing different tasks.")}
                />

            )}
            <Grid container spacing={2} sx={{mt:1}}>

                {tasks.map((task, i) => {
                    return <Grid item key={i} md={4}>
                        <TaskCard {...task} />
                    </Grid>
                })}
            </Grid>
        </div>
    }
}


MyTasks.propTypes = {
    t: PropTypes.func
}
MyTasks.displayName = 'MyTasks';

export default withTranslation()(MyTasks)