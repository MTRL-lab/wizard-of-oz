import React from 'react';
import PropTypes from 'prop-types'
import SketchTaskUpload from '../CreateSketchTask/SketchTaskUpload.jsx';
import SchemaTaskDescription from './SchemaTaskDescription';
import DesignBrief from '../Task/DesignBrief';
import BaseIdea from '../Task/BaseIdea';


const CreateSchema = (props) => {
    const { step, ...rest } = props;

    switch (step) {
        case 1:
            return <DesignBrief {...rest} />
        case 2:
            return <SchemaTaskDescription {...rest} />

        case 3: 
        return <BaseIdea {...rest} />;

        case 4:
            return <SketchTaskUpload {...rest} />;
    }
};

CreateSchema.propTypes = {
    step:PropTypes.any,
    task:PropTypes.object
}


export default CreateSchema;
