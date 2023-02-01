import React, { useState, useRef } from "react";
import PropTypes from "prop-types";
import { withTranslation } from 'react-i18next';

import Grid from "@mui/material/Grid"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import CardHeader from "@mui/material/CardHeader"
import CardMedia from "@mui/material/CardMedia"
import Typography from "@mui/material/Typography"

import Button from "@mui/material/Button"
import Box from "@mui/material/Box"
import Avatar from "@mui/material/Avatar"

import SignUpForm from "../ConsentForm/SignUpForm"
import LoginForm from "../Signin/LoginForm";
import Container from "@mui/material/Container"

import Modal from '@mui/material/Modal';
import SimpleMap from "../SimpleMap"


import background from '../../assets/img/drone.jpg'
import qian from '../../assets/img/qian.jpeg'
import dan from '../../assets/img/dan.png'
import aaron from '../../assets/img/aaron.jpg'
import jonathan from '../../assets/img/jonathan.jpg'
import stephen from '../../assets/img/stephen.jpg'

import technion from '../../assets/img/technion.png'
import cornell from '../../assets/img/cornell.png'

import screenshot from '../../assets/img/Screenshot.png'

import zhr from '../../assets/img/zhr.webp'
import hula from '../../assets/img/hula.jpeg'
import hayozrim from '../../assets/img/hayozrim.png'


const images = [aaron, qian, jonathan, stephen, dan]



const modelStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    boxShadow: 24,
    p: 4,
};


const LandingWizard = ({ t }) => {

    const [openLogin, setOpenLogin] = useState(false)

    const myRef = useRef(null)

    const executeScroll = () => myRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })

    const locationData = <Grid container>
        <Grid item sm={4}>{t("building_description")} </Grid>
        <Grid item sm={8}>
            <SimpleMap lat={32.9709024} lng={35.5596483} zoom={13} style={{ height: 200 }} />
        </Grid>
    </Grid>

    const Benefits = () => <ul style={{ fontSize: "1.1em" }}>
        <li>{t("benefit_1")}.</li>
        <li>{t("benefit_2")}.</li> 
        <li>{t("benefit_3")}.</li>
        <li>{t("benefit_4")}.</li>
        <li>{t("benefit_5")}.</li>
        <li>{t("benefit_6")}.</li>
    </ul>

    
    const partners = [
        {
            src: zhr,
            label: t('ZHR industrial park'),
            href: 'https://www.tzahar.com/'
        },
        {
            src: hula,
            label: t('Hula-Valley community'),
            href: 'http://www.nortech-platform.com/hula-valley'
        },
        {
            src: hayozrim,
            label: t('Hayozrim community'),
            href: 'https://www.forumamanim.com/'
        }]

    return <>
        <div style={{ background: "#fff" }}>

            <Container style={{ paddingTop: "50px", paddingBottom: "10px" }} maxWidth="lg">
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6} lg={4}>
                        <Typography variant="h3" style={{
                            fontWeight: 'bold', marginBottom: "10px", maxWidth: 600,

                        }}>{t("headline")}</Typography>
                        <Typography variant="body1" gutterBottom component="div">
                            {t("project_description")}
                        </Typography>
                        <div style={{ display: 'flex', gap: "10px", marginBottom: 40 }}>
                            <Button size="large" variant="contained" onClick={executeScroll} color="success">{t("Sign up to participate")}</Button>

                            <Button size="large" color="primary" variant="contained" onClick={() => setOpenLogin(true)} >{t("Return as participant")}</Button>
                        </div>
                    </Grid>
                    <Grid item xs={12} md={6} lg={8}>
                        <img src={background} alt="Aerial image of the site" width="100%" />

                        <Typography variant="h6" style={{ marginTop: 10 }}>{t("A participatory design project by world-class research universities")}</Typography>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'center',
                                p: 1,
                                // m: 2,
                            }}
                        >
                            <Box sx={{ m: 2, maxWidth: 200, width: "60%" }}>
                                <img src={technion} alt='Technion logo' style={{ maxHeight: 100, maxWidth: "100%" }} />
                            </Box>
                            <Box sx={{ m: 2, maxWidth: 100, width: "40%" }}>
                                <img src={cornell} alt='Cornell logo' style={{ maxHeight: 100, maxWidth: "100%" }} />
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </div>

        <Box sx={{ backgroundColor: "primary.main", color: "primary.contrastText" }}>
            <Container maxWidth="md">
                <Grid container spacing={2}>
                    <Grid item xs={12} md={8}>
                        <Typography variant="h4" style={{ fontWeight: 'bold' }}>{t("Your benefits by joining the project")}</Typography>
                        <Typography variant="body1">{t("benefit_0")}</Typography>

                        
                        <Benefits />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <img src={screenshot} alt="Application screenshot" style={{ maxWidth: 358, width: "100%", marginLeft: 'auto', marginRight: 'auto' }} />
                    </Grid>
                </Grid>
            </Container>
        </Box>
        <Container style={{ paddingTop: "50px", paddingBottom: "50px" }} maxWidth="md">

            <Typography variant="h4" gutterBottom>{t("Frequently Asked Questions")}</Typography>

            {t('faq', { returnObjects: true }).map((item, key) => {
                return <Faq key={key}  {...item} />
            })}

            <Faq question={t('About the building')} answer={locationData} />
        </Container>

        <Container style={{ paddingTop: "20px", paddingBottom: "20px" }} maxWidth="md" >
            <Box sx={{
                textAlign: "center"
            }}>
                <Typography variant="h4" gutterBottom color="primary" >
                    {t("Who we are?")}
                </Typography>
            </Box>
            <Grid container spacing={2} >
                {
                    t('team', { returnObjects: true }).map((member, key) => <Grid item xs={6} sm={4} key={key}>
                        <TeamMember {...member} image={images[key]} />
                    </Grid>)
                }

            </Grid>
        </Container>
        <div style={{ background: "#fff",paddingTop: "20px", paddingBottom: "20px" }}>

            <Container style={{ paddingTop: "20px", paddingBottom: "20px", backgroundColor: '#ffffff' }} maxWidth="md" >
                <Box sx={{
                    textAlign: "center"
                }}>
                    <Typography variant="h4" gutterBottom color="primary" >
                        {t("Our community partners")}
                    </Typography>
                </Box>
                <Grid container spacing={2} >
                    {
                        partners.map(({ src, label, href }, key) => <Grid item xs={12} sm={4} key={key} align="center">

                            <Typography variant="h6" gutterBottom align="center">{label}</Typography>
                            <a href={href}><img key={key} src={src} alt={label} style={{ height: 70 }} /> </a>

                        </Grid>)
                    }

                </Grid>
            </Container>
        </div>

        <Container ref={myRef} maxWidth="lg" style={{ paddingTop: "20px", paddingBottom: "20px" }}>
            <Grid container sx={{ backgroundColor: "primary.main", color: "primary.contrastText" }}>
                <Grid item xs={12} md={6} sx={{ p: 2 }}>
                    <Typography variant="h4" gutterBottom >
                        {t("Join now")}
                    </Typography>
                    <Typography variant="p" gutterBottom >
                        {t("This is a time-limited project that will start soon and will not be available later.")}
                    </Typography>
                    <Benefits />
                </Grid>
                <Grid item xs={12} md={6} sx={{ backgroundColor: '#fff', p: 2 }}>
                    <Typography variant="h5" gutterBottom sx={{ color: 'text.primary' }}>
                        {t("Registration")}
                    </Typography>
                    <Typography variant="p" gutterBottom sx={{ color: 'text.secondary' }}>
                        {t("privacy_notice")}
                    </Typography>
                    <SignUpForm />
                </Grid>
            </Grid>
        </Container>

        <Modal
            open={openLogin}
            onClose={() => setOpenLogin(false)}
            aria-labelledby="Login"
            aria-describedby="Login"
        >
            <div style={modelStyle}><LoginForm /></div>
        </Modal>


    </>
}

const avatarSize = { width: 100, height: 100 }

function TeamMember({ name, image, affiliation, description }) {
    return <><Avatar src={image} sx={avatarSize} />
        <Typography variant="h6" gutterBottom >
            {name}
        </Typography>
        <Typography variant="subtitle2" gutterBottom >
            {affiliation}
        </Typography>
        {description}
    </>
}
TeamMember.propTypes = {
    name: PropTypes.string.isRequired,
    image: PropTypes.any,
    affiliation: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
}

function Faq({ question, answer, image = '' }) {

    const ps = (typeof answer === 'string') ? answer.split("\n") : [answer];

    return <Card style={{ marginTop: 20 }}>
        <CardHeader title={question} />
        {image && <CardMedia>{image}</CardMedia>}
        <CardContent>
            {ps.map((p, key) => <Typography key={key} variant="body2">{p}</Typography>)}
        </CardContent>
    </Card>
}
Faq.propTypes = {
    question: PropTypes.string.isRequired,
    answer: PropTypes.any.isRequired,
    extra: PropTypes.any,
    image: PropTypes.any
}


LandingWizard.propTypes = {
    t: PropTypes.func
}


LandingWizard.displayName = 'LandingWizard';

export default withTranslation()(LandingWizard)