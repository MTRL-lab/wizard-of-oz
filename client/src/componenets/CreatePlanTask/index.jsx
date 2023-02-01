import React from 'react';
import PropTypes from 'prop-types'
import ModelTaskUpload from './PlanTaskUpload.jsx';
// import PlanTaskDescription from './PlanTaskDescription';
import DesignBrief from '../Task/DesignBrief';
import BaseIdea from '../Task/BaseIdea';


const CreateModel = (props) => {
    const { step, ...rest } = props;

    switch (step) {
        case 1:
            return <DesignBrief {...rest} />

        case 2: 
        return <BaseIdea {...rest} />;

        case 4:
            return <ModelTaskUpload {...rest} />;
    }
};

CreateModel.propTypes = {
    step:PropTypes.any,
    task:PropTypes.object
}


export default CreateModel;
