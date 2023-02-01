import React, { Component } from "react"
import PropTypes from "prop-types";
import { withTranslation } from 'react-i18next';

import { Navigate } from "react-router-dom"

import LoadingButton from '@mui/lab/LoadingButton';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import ErrorMessage from '../ErrorMessage'

import api from '../../services/api';


class LoginForm extends Component {

    state = {
        email: '',
        error: false,
        isSuccess: false,
        loading: false
    }

    handleSubmit = event => {

        event.preventDefault();
        let {
            email,
        } = this.state;

        this.setState({ loading: true })

        api.post('sign/sendtoken/', {
            email,

        })
            .then(() => {
                this.setState({ isSuccess: true })
            })
            .catch(error => {
                this.setState({ error, loading: false })
            });
    };


    handleInputChange = (e) => {
        this.setState({ 'email': e.target.value })
    }

    render() {
        const { email, isSuccess, loading, error } = this.state;
        const {t} = this.props;
        if (isSuccess) {
            return <Navigate to={`/sign/token?email=${email}`} />;
        }

        return <Card
            component="form"
            style={{ maxWidth: 400 }}
            onSubmit={this.handleSubmit}
        >
            <CardHeader title={t("Login")} subheader={t("Input the email that you signed up with to log in")} />
            <CardContent>

                <TextField
                    required
                    id="email"
                    name="email"
                    label={t("Email")}
                    value={email}
                    placeholder={t("Your email")}
                    autoComplete="email"
                    fullWidth
                    style={{ paddingBottom: 10 }}
                    onChange={this.handleInputChange}
                />
                <LoadingButton
                    type="submit"
                    loading={loading}
                    loadingIndicator={t("Loading...")}
                    variant="contained"
                    fullWidth
                    color="success"
                >{t("Sign in")}</LoadingButton>
            </CardContent>
            <ErrorMessage
                action={() => this.setState({ error: false })}
                error={error}
            />
        </Card>


    }
}


LoginForm.propTypes = {
    t: PropTypes.func
}
export default withTranslation()(LoginForm)
