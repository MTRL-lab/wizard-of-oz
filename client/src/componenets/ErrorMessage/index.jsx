import React from "react"
import PropTypes from 'prop-types'

import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';


function Error(message, action) {
    return <Alert severity="error" sx={{ width: '100%' }}>
        {message}
        <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={action}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
    </Alert>
}
function Warning(message, action) {
    return <Alert severity="warning" sx={{ width: '100%' }}>
        {message}
        <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={action}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
    </Alert>
}



export default function ErrorMessage({ error, action }) {

    const elementFunc = (error && error.kind == 'warning') ? Warning : Error;

    const message = (error && error.response && error.response.data) ?
        error.response.data.error :
        (error && error.message ? error.message : '');



    return <Snackbar
        vertical='bottom'
        horizontal='right'
        open={!!error}
        autoHideDuration={6000}
    >
            {elementFunc(message,action)}
            
        
    </Snackbar>

}

ErrorMessage.propTypes = {
    error: PropTypes.any,
    action: PropTypes.func
}