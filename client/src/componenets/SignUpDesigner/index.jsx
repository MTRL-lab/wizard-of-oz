import React from "react";
import PropTypes from "prop-types";
import { withTranslation } from 'react-i18next';

import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"


import DesignerSignUpForm from "../ConsentForm/DesignerSignUpForm"
import Container from "@mui/material/Container"

const SignUpDesigner = ({ t }) => {


    return <Container maxWidth="lg" style={{ paddingTop: "20px", paddingBottom: "20px" }}>
        <Grid container sx={{ backgroundColor: "primary.main", color: "primary.contrastText" }}>
            <Grid item xs={12} md={6} sx={{ p: 2 }}>
                <Typography variant="h4" gutterBottom >
                    {t("Welcome to the ZHR project")}
                </Typography>
                <Typography variant="p" gutterBottom  paragraph={true}>
                    {t("This is a community-based collaborative architectural design project. We aim to create a concept design for the ZHR building near Rosh-Pinna.")}
                </Typography>

                <Typography variant="p" gutterBottom paragraph={true}>
                    {t("After signing up, you will receive a login token to your email that will be used for authentication. Once logged in, you will be able to participate and submit your work.")}
                </Typography>
            </Grid>
            <Grid item xs={12} md={6} sx={{ backgroundColor: '#fff', p: 2 }}>
                <Typography variant="h5" gutterBottom sx={{ color: 'text.primary' }}>
                    {t("Designer Registration")}
                </Typography>
                <Typography variant="p" gutterBottom sx={{ color: 'text.secondary' }}>
                    {t("privacy_notice")}
                </Typography>
                <DesignerSignUpForm />
            </Grid>
        </Grid>
    </Container>

}

SignUpDesigner.propTypes = {
    t: PropTypes.func
}


export default withTranslation()(SignUpDesigner)
