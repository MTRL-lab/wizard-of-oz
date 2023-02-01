import React,{useState} from 'react';
import { Link, Navigate } from "react-router-dom"
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';

import { withTranslation } from 'react-i18next';
import i18n from "i18next";
import PropTypes from "prop-types";

import api from '../../services/api';

const pages = [
  
];


const projectName = 'Designing Tzahar'

const Nav = ({t}) => {

  const [login, setLogin] = useState(true)
  const logout =() => {
    api.post('sign/out/')
      .then(()=>setLogin(false))
  }

  if (!login)
    return <Navigate to="/welcome/" />

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
 
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1}}
          >
            {t(projectName)}
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page.name}
                component={Link}
                to={page.link}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page.name}
              </Button>
            ))}
          </Box>
          

          <Box sx={{ flexGrow: 0 }}>
          {i18n.language.includes('en') && <Button style={{color:'white'}} component={"a"} href='?lng=he'> עברית</Button>}
          {i18n.language.includes('he') && <Button style={{color:'white'}} component={'a'} href='?lng=en' >English</Button>}

              <Button  sx={{ p: 0 }} variant="primary" onClick={logout}>
                {t("Logout")}
              </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

Nav.propTypes = {
  t: PropTypes.func,
}

export default withTranslation()(Nav);