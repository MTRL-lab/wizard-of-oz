import React, { Fragment } from "react";
import { Outlet } from "react-router-dom"
import Nav from "../../componenets/Nav"
import Footer from "../../componenets/Footer"
import Container from '@mui/material/Container';

function LandingLayout() {
  return (
    <Fragment>
      <Nav />
      <Outlet />
      <Container style={{ backgroundColor: "rgb(13, 71, 161)", color: "rgb(200, 200, 200)" }}>
        <Footer />
      </Container>
    </Fragment>
  );
}

export default LandingLayout