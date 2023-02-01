import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: 400,
    width:"100%",
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

function LangModal({t, initialOpen = false,callback }) {
    const [open, setOpen] = React.useState(initialOpen);
    //   const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="Choose Language"
            aria-describedby="What language you prefer?"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    {t("Choose Chatbot Language")}
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                {t("What language you prefer?")}
                </Typography>
                
                <Button
                    variant="primary"
                    onClick={() => {
                        callback("he-IL");
                        handleClose()
                    }}
                >
                    עברית
                </Button>{" "}
                <Button
                    variant="primary"
                    onClick={() => {
                        callback("ar-XA");
                        handleClose()
                    }}
                >
                    عربي
                </Button>{" "}
                <Button
                    variant="primary"
                    onClick={() => {
                        callback("en-US");
                        handleClose()
                    }}
                >
                    English
                </Button>{" "}
            </Box>
        </Modal>
    );
}

LangModal.propTypes = {
    initialOpen: PropTypes.bool,
    callback: PropTypes.func,
    t: PropTypes.func,
}

export default withTranslation()(LangModal);