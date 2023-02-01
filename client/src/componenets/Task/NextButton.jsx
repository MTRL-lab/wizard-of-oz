import React from "react";
import PropTypes from "prop-types"
import { withTranslation } from 'react-i18next';

import {Link} from "react-router-dom"

import DoneIcon from '@mui/icons-material/Done';
import Button from "@mui/material/Button";
import Paper from '@mui/material/Paper';

const queryParams = () => {
    return new Proxy(new URLSearchParams(window.location.search), {
        get: (searchParams, prop) => searchParams.get(prop),
      });
}


export const  getUrl = () => {
        const params = queryParams();
        let step = params.step;
        if (!step) step = 1
        step++
        return `?step=${step}`
}

function NextButton({to,t}) {

    const next = to || getUrl()
    
    return <Paper sx={{p:4,mt:5, mb:5}}>
    <Button component={Link} to={next} 
        variant="contained" color="success" 
        size="large"><DoneIcon />{t("Proceed to the next step")}</Button>
    </Paper>
}

NextButton.propTypes = {
    to: PropTypes.string,
    t: PropTypes.func
}

export default withTranslation()(NextButton)