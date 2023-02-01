import React, { Fragment } from "react";
import { Outlet } from "react-router-dom"
import Nav from "../../componenets/Nav"
import Footer from "../../componenets/Footer"
import Container from '@mui/material/Container';

export default function LandingLayout() {
  return (
    <Fragment>
      <Nav />
      <Container>
        <Outlet />
      </Container>
      <div style={{ backgroundColor: "rgb(13, 71, 161)", color: "rgb(200, 200, 200)" }}>
        <Container>
          <Footer />
        </Container>
      </div>
    </Fragment>
  );
}
