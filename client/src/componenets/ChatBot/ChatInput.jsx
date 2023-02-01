import React, { Component } from "react";
import PropTypes from "prop-types";
import { withTranslation } from 'react-i18next';

import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

class ChatInput extends Component {
    state = {
        value: "",
    };

    componentDidMount() {

    }
    handleSend = (e) => {

        e && e.preventDefault()

        const { handleSend } = this.props;
        const { value } = this.state;
        
        value && handleSend(value);

        this.setState({ value: "" });
    };

    experimentDone = () => {
        const { experimentDone } = this.props;

        experimentDone();
    };


    handleKeyUp = (event) => {
        const { updateKeyUp } = this.props;
        updateKeyUp()
        if (event.key === "Enter") {
            event.preventDefault()
            return this.handleSend();
        }
    };

    handleChange = (event) => {
        const { value } = event.target;
        this.setState({
            value,
        });
    };

    render() {
        const { value } = this.state;
        const {t, canFinish} = this.props;

        return (
            <Paper
                square
                component="form"
                onSubmit={this.handleSend}
                sx={{
                    position: "fixed",
                    bottom: 0, left: 0, right: 0,
                    p: '10px 5px',
                    alignItems: 'strech',
                    display: {
                        sm: 'flex',
                    }
                }}
            >
                <TextField
                    sx={{
                        flex: 1,
                        width: { xs: "100%", sm: 'auto' },
                        display: {
                            sm: 'flex',
                        }
                    }}
                    autoComplete="off"
                    autoFocus
                    placeholder={t("Type a message")}
                    value={value}
                    onChange={this.handleChange}
                    onKeyUp={this.handleKeyUp}
                    inputProps={{ 'aria-label': 'Type a message' }}
                />
                <Button
                    sx={{ display: { xs: 'none', sm: 'block' } }}
                    variant="contained"
                    type="submit"
                    aria-label="Send">
                     {t("Send")}
                    {/* <SendIcon /> */}

                </Button>
                <Button 
                    sx={{ p: '10', width: { xs: '100%', sm: 'auto' }}}
                    color="success"
                    disabled={!canFinish}
                    variant={canFinish?'contained':'outlined'}
                    disableElevation={!canFinish}
                    disableFocusRipple={!canFinish}
                    onClick={() =>this.experimentDone()} aria-label="Done">
                    {/* <DoneIcon />{" "} */}
                    {t("Finish Chat")}
                </Button>
            </Paper >
        );
    }
}

ChatInput.propTypes = {
    handleSend: PropTypes.func.isRequired,
    updateKeyUp: PropTypes.func.isRequired,
    experimentDone: PropTypes.func.isRequired,
    t: PropTypes.func,
    canFinish: PropTypes.bool.isRequired,
};

export default withTranslation()(ChatInput)
