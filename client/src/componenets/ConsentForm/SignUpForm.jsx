import React, { Component } from 'react';
import PropTypes from "prop-types";
import { Navigate } from "react-router-dom"
import { withTranslation } from 'react-i18next';

// @mui/material components
import LoadingButton from '@mui/lab/LoadingButton';
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid';
import ErrorMessage from '../ErrorMessage'

import { SelectField } from "./GroupField.jsx"
import api from '../../services/api';





const paddingStyle = {
    marginTop: '5px',
    marginBottom: '5px',
    width: '100%',
};

class SignUpForm extends Component {
    state = {
        screen: 0,
        name: '',
        password: '',
        kind: '',
        fname: '',
        lname: '',
        location: '',
        experience: '',
        connection: '',
        gender: '',
        year: '',
        email: '',
        isSuccess: false,
        formErrors: {},
        loading: false
    };

    handleInputChange = event => {
        this.setState({
            [event.target.name]: event.target.value,
            isFailed: false,
        });
    };

    handleSubmit = event => {

        event.preventDefault();


        let {
            email,
            fname,
            lname,
            password,
            connection,
            location,
            gender,
            year = 0,
        } = this.state;

        const task = {
            // kind: 'CoDesign',
            // status: 'progress',
            // ProjectId: 1,
            // TaskBlockId: 5
        }
        this.setState({ loading: true })

        api.post('sign/up', {
            email,
            kind: 'client',
            fname,
            lname,
            password,
            year,
            gender,
            connection,
            location,
            task
        })
            .then(() => {
                this.setState({ isSuccess: true, loading: false })
            })
            .catch(error => this.setError(error));
    };

    setError = error => {
        console.error(error);
        if (error.response.status == 409) {
            error.kind = 'warning'
        }

        this.setState({ loading: false, error });
    };

    moveTo = (screen) => {
        this.setState({ screen })
    }

    render() {

        const {
            error,
            // screen,
            fname,
            lname,
            gender,
            email,
            year,
            isSuccess,
            location,
            connection,
            loading
        } = this.state;

        const { t } = this.props;

        const locations = [t('Hazor Haglilit'), t('Rosh Pina'), t('Tuba Zangriyya'), t('Zefad'), t('Other locallity in the Galil'), t('I do not live in the area')]
        const connections = [t('I live in the area'), t('I work in the area'), t('I am an architect / designer'), t('Other')]
        const genders = [
            t('Female'),
            t('Male'),
            t('Other'),
            t('Prefer not to disclose'),
        ]
        if (isSuccess) {
            return <Navigate to={`/sign/token?email=${email}`} />;
        }
        var currentYear = (new Date()).getFullYear();

        return (
                <form onSubmit={this.handleSubmit}>

                    <Grid container spacing={2}>

                        <Grid item sm={6} xs={12}>
                            <TextField
                                style={paddingStyle}
                                required
                                id="fname"
                                name="fname"
                                label={t("Given name")}
                                fullWidth
                                inputProps={{
                                    minLength: '2',
                                }}
                                value={fname}
                                autoComplete="given-name"
                                onChange={this.handleInputChange}
                            />
                        </Grid>
                        <Grid item sm={6} xs={12}>

                            <TextField
                                style={paddingStyle}
                                required
                                id="lname"
                                name="lname"
                                label={t("Family name")}
                                fullWidth
                                inputProps={{
                                    minLength: '2',
                                }}
                                value={lname}
                                autoComplete="family-name"
                                onChange={this.handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={12}>

                            <TextField
                                style={paddingStyle}
                                required
                                id="email"
                                name="email"
                                value={email}
                                label={t("Email")}
                                type="email"
                                fullWidth
                                autoComplete="email"
                                onChange={this.handleInputChange}
                            />
                        </Grid>

                        <Grid item xs={12}>

                            <SelectField
                                style={paddingStyle}
                                id="connection"
                                value={connection}
                                label={t("What kind of connection do you have to the project?")}
                                onChange={(event) => {
                                    this.handleInputChange(event)
                                    this.moveTo(2)
                                }}
                                items={connections}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <SelectField
                                style={paddingStyle}
                                id="location"
                                value={location}
                                label={t("Which locality are you associated with?")}
                                onChange={(event) => {
                                    this.handleInputChange(event)
                                    this.moveTo(1)
                                }}
                                items={locations}
                            />
                        </Grid>
                        

                        <Grid item sm={6} xs={12}>
                            <TextField
                                style={paddingStyle}
                                required
                                id="year"
                                name="year"
                                value={year}
                                type="number"
                                inputProps={{
                                    max: currentYear - 18,
                                    min: currentYear - 100,
                                }}
                                label={t("When were you born?")}
                                onChange={this.handleInputChange}
                                autoComplete="bday-year"
                            />
                        </Grid>
                        <Grid item sm={6} xs={12}>
                            <SelectField
                                style={paddingStyle}
                                id="gender"
                                autoComplete="gender"
                                value={gender}
                                label={t("Gender")}
                                onChange={(event) => {
                                    this.handleInputChange(event)
                                }}
                                items={genders}
                            />
                        </Grid>

                    </Grid>
                    <LoadingButton
                        variant="contained"
                        type="submit"
                        fullWidth
                        color='success'
                        loading={loading}
                        loadingIndicator={t("Registrating user")}
                    >{t("Continue")}</LoadingButton>
                    {/* <div>{`${t('Step')} ${screen + 1}/3`}</div> */}



                <ErrorMessage
                    error={error}
                    action={() => this.setState({ error: false })}
                />
            </form>


        );
    }
}


SignUpForm.propTypes = {
    t: PropTypes.func
}



export default withTranslation()(SignUpForm);