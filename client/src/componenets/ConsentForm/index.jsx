import React, { Component } from 'react';
import PropTypes from "prop-types";
import { withTranslation } from 'react-i18next';
import i18n from "i18next";

import { Navigate } from "react-router-dom"

// @mui/material components
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';


import Checkbox from '@mui/material/Checkbox';

import TextHe from './textHe'
import TextEn from './textEn'

import api from '../../services/api';

const queryParams = () => {
    return new Proxy(new URLSearchParams(window.location.search), {
        get: (searchParams, prop) => searchParams.get(prop),
    });
}

class ConsentForm extends Component {
    state = {
        consent1: true,
        consent2: true,
        consent3: true,
        consent4: true,
        consent5: true,
        isSuccess: false,
        formErrors: {},
    };

    componentDidMount() {


    }


    handleInputChange = event => {
        this.setState({
            [event.target.name]: event.target.checked,
            isFailed: false,
        });
    };

    handleSubmit = event => {

        event.preventDefault();

        const {
            consent1,
            consent2,
            consent3,
            consent4,
            consent5,
        } = this.state;

        if (!consent1 ||
            !consent2 ||
            !consent3 ||
            !consent4 ||
            !consent5) {
            return this.setError('You need to agree to all the required items')
        }
        api.post('sign/consent/', {
            consent1,
            consent2,
            consent3,
            consent4,
            consent5,
        })
            .then(() => {
                this.setState({ isSuccess: true })
            })
            .catch(error => this.setError(error));
    };

    setError = error => {

        this.setState({ error });
    };


    render() {
        const params = queryParams()
        const returnTo = params.return;
        const {
            consent1,
            consent2,
            consent3,
            consent4,
            consent5,
            isSuccess,
        } = this.state;

        const {t} = this.props;

        if (isSuccess) {
            return <Navigate to={returnTo ? returnTo : '/'} />;
        }

        const LandingText = (i18n.language.includes('en')) ? TextEn : TextHe


        const helperStyle ={textAlign:'inherit'}
        return (
            <div style={{ marginTop: 40, marginBottom: 40 }}>

                <Typography variant="h4" gutterBottom>
                    {t("Informed consent to participate in the study")}
                </Typography>

                <LandingText />

                <Card>
                    <CardContent>
                        <form onSubmit={this.handleSubmit}>
                            <FormControlLabel control={<Checkbox checked={consent1} name='consent1' onChange={this.handleInputChange} required />} label={t("I agree to participate")} />
                            <FormHelperText style={helperStyle}>{t("consent1")}</FormHelperText>

                            <FormControlLabel control={<Checkbox name='consent2' checked={consent2} onChange={this.handleInputChange} required />} label={t("I agree that I will not receive compensation")} />
                            <FormHelperText style={helperStyle}>{t("consent2")}</FormHelperText>

                            <FormControlLabel control={<Checkbox name='consent3' checked={consent3} onChange={this.handleInputChange} required />} label={t("I agree that the design might not be realized")} />
                            <FormHelperText style={helperStyle}>{t("consent3")}</FormHelperText>

                            <FormControlLabel control={<Checkbox name='consent4' checked={consent4} onChange={this.handleInputChange} required />} label={t("I waive copyright claims")} />
                            <FormHelperText style={helperStyle}>{t("consent4")}</FormHelperText>

                            <FormControlLabel control={<Checkbox required name='consent5' checked={consent5} onChange={this.handleInputChange} />} label={t("I understand and participate of my own free will")} />
                            <FormHelperText style={helperStyle}>{t("consent5")}</FormHelperText>

                            <Button
                                variant="contained"
                                type="submit"
                                fullWidth
                            >
                                {t("Agree")}
                            </Button>

                        </form>
                    </CardContent>
                </Card>

            </div >
        );
    }
}

ConsentForm.propTypes = {
    t: PropTypes.func,
}
export default  withTranslation()(ConsentForm);
