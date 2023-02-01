import React, { Component } from "react"
import PropTypes from 'prop-types'
import { withTranslation } from 'react-i18next';
import { Navigate } from "react-router-dom"

import BigBox from "../BigBox";
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';


import api from '../../services/api';
import ErrorMessage from "../ErrorMessage";

function useQuery() {
    return new URLSearchParams((new URL(document.location)).searchParams)
}

class SignInToken extends Component {

    state = {
        token: '',
        isSuccess: false,
        error: null,
        loading: false
    }

    handleInputChange = (e) => {
        this.setState({ 'token': e.target.value })
    }

    handleSubmit = (e) => {
        e.preventDefault()

        const { token } = this.state
        const query = useQuery();
        const email = query.get('email');
        this.setState({ loading: true })
        api.post('/sign/in/', {
            token,
            email
        })
            .then(() => {
                this.setState({ isSuccess: true })
            })
            .catch(error => {
                this.setState({ error, loading: false })
            });

    }

    render() {
        const { token, error, isSuccess, loading } = this.state
        const {t} = this.props

        if (isSuccess) {
            return <Navigate to={`/`} />;
        }
        return <BigBox
            secondary={t("Login")}
            headline={t("Enter Token")}
            description={t("token_message")}
        >
            <form onSubmit={this.handleSubmit}>
                <TextField
                    required
                    id="token"
                    name="token"
                    label={t("Token")}
                    fullWidth
                    value={token}
                    autoComplete="one-time-code"
                    onChange={this.handleInputChange}
                />
                <LoadingButton
                    loading={loading}
                    fullWidth
                    variant="contained"
                    type="submit"
                >
                    {t("Validate")}
                </LoadingButton>
                <ErrorMessage
                    error={error}
                    action={() => this.setState({ error: false })}
                />
            </form>

        </BigBox>
    }
}

SignInToken.propTypes = {
    step: PropTypes.any,
    task: PropTypes.object,
    t: PropTypes.func
}

export default withTranslation()(SignInToken)