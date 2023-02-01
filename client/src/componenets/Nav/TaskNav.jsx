import * as React from 'react';
import { PropTypes } from 'prop-types';
import {Link} from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';


const TaskNav = ({title=''}) => {

  return (
    <AppBar position="fixed">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1}}
          >
            {title}
          </Typography>
          <Box sx={{ display: 'flex' }}>
          <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }} component={Link} to="/">
            <CloseIcon />
          </IconButton>
          </Box>

          
        </Toolbar>
      </Container>
    </AppBar>
  );
};

TaskNav.propTypes = {
  title: PropTypes.string
}
export default TaskNav;