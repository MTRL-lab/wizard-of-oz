import React from 'react';
import PropTypes from "prop-types";
import { withTranslation } from 'react-i18next';

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import PhoneAndroid from '@mui/icons-material/PhoneAndroid';
import Email from '@mui/icons-material/Email';
import Map from '@mui/icons-material/Map';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import technion from '../../assets/img/technion.png'
import mtrl from '../../assets/img/mtrl.jpg'
import cornell from '../../assets/img/cornell.png'

function Footer({t}) {

    const white ={color:'#ffffff'}

    const phone = <a style={white} href="tel:+972-54-4577442">+972-54-4577442</a>
    const email = <a style={white} href="mailto:zhr.project@technion.ac.il">zhr.project@technion.ac.il</a>
    return (

        <>
            <Grid container style={{ paddingTop: 30, paddingBottom: 30 }}>
                <Grid item md={6} xs={12}>
                    <List>
                        <ListItem>
                            <Typography variant="body1" gutterBottom>{t('do not hesitate')}</Typography>
                        </ListItem>
                        <ListItem style={{direction:'ltr'}}>
                            <ListItemIcon>
                                <PhoneAndroid style={{color:'white'}}/>
                            </ListItemIcon>
                            <ListItemText primary={phone} />
                        </ListItem>
                        <ListItem style={{direction:'ltr'}}>
                            <ListItemIcon>
                                <Email style={{color:'white'}}/>
                            </ListItemIcon>
                            <ListItemText primary={email} />
                        </ListItem>
                        <ListItem style={{direction:'ltr'}}>
                            <ListItemIcon>
                                <Map style={{color:'white'}}/>
                            </ListItemIcon>
                            <ListItemText primary={`Faculty of Architecture and Town Planning
Segoe Building
Technion – Israel Institute of Technology
Technion City, Haifa 3200003`} />
                        </ListItem>
                    </List>
                </Grid>
                <Grid item xs={12} md={6} >
                    
                    <div style={{ backgroundColor: 'white', display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
                    <a href="https://mtrl.net.technion.ac.il/"><img src={mtrl} alt='MTRL lab logo' style={{ width: 100 }} /></a>
                    <a href="https://technion.ac.il/"><img src={technion} alt='Technion logo' style={{ width: 100 }} /></a>
                    <a href="https://www.cornell.edu/"><img src={cornell} alt='Cornell logo' style={{ width: 100 }} /></a>
                    </div>
                </Grid>
            </Grid>
        </>
    );
}

Footer.propTypes = {
    t: PropTypes.func
}



export default withTranslation()(Footer)