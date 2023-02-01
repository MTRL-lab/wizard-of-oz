import React from 'react';
import PropTypes from 'prop-types'
import ChatBot from '../ChatBot';
import Brief from '../Brief';


const RequirementsBotTask = (props) => {
    const { step, ...rest } = props;

    switch (step) {

        case 1:
            return <ChatBot  bot="gpt3" {...rest} />
        case 2:
            return <Brief {...rest} />
       
    }
}
RequirementsBotTask.propTypes = {
    step:PropTypes.any,
}


export default RequirementsBotTask;
