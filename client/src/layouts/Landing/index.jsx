import React from "react";
import { Outlet } from "react-router-dom"
import { withTranslation } from 'react-i18next';
import i18n from "i18next";
import PropTypes from "prop-types";

import Footer from "../../componenets/Footer"
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography'



function LandingLayout({t}) {

  return (
    <>
      <div style={{ display: 'flex', backgroundColor:'#0d47a1', padding:10}}>

        <Typography variant="h6" style={{flex:1, color:'white'}}>{t("Designing Tzahar")}</Typography>

          {i18n.language.includes('en') && <Typography style={{color:'white'}} component={"a"} href='?lng=he'> עברית</Typography>}
          {i18n.language.includes('he') && <Typography style={{color:'white'}} component={'a'} href='?lng=en' >English</Typography>}


      </div>
      <Outlet />
      <div style={{ backgroundColor: "rgb(13, 71, 161)", color: "rgb(200, 200, 200)" }}>
        <Container>
          <Footer />
        </Container>
      </div>
    </>
  );
}

LandingLayout.propTypes = {
  t: PropTypes.func,
}

export default withTranslation()(LandingLayout)