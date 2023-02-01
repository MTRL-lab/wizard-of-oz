import React,{useState} from "react"
import PropTypes from 'prop-types'
import { withTranslation } from 'react-i18next';


import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import api from '../../services/api';


const SignInToken = ({t}) => {

    const [email, setEmail] = useState();

    const handleInputChange = (e) => {
        setEmail(e.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        api.post('/sign/token/', {
            email
        })

    }

    return <form onSubmit={handleSubmit}>

        <Typography variant="h5" gutterBottom>
            {t("Enter the email you registered with:")}
        </Typography>
        <TextField
            required
            type="email"
            id="email"
            name="email"
            label={t("Email")}
            fullWidth
            value={email}
            autoComplete="email"
            onChange={handleInputChange}
        />
        <Button
        fullWidth
            variant="contained"
            type="submit"
        >
            {t("Sign in")}
        </Button>
    </form>
}


SignInToken.propTypes = {
    t: PropTypes.func
}


export default withTranslation()(SignInToken);
