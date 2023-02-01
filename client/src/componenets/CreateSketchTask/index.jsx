import React from 'react';
import PropTypes from 'prop-types'
import SketchTaskUpload from './SketchTaskUpload';
import SketchTaskDescription from './SketchTaskDescription';
import DesignBrief from '../Task/DesignBrief';

const CreateSketch = (props) => {
    const { step, ...rest } = props;

    switch (step) {
        case 1:
            return <SketchTaskDescription {...rest} />
        case 2:
            return <DesignBrief {...rest} />
        case 3:
            return <SketchTaskUpload {...rest} />;
    }
};

CreateSketch.propTypes = {
    step:PropTypes.any
}


export default CreateSketch;
