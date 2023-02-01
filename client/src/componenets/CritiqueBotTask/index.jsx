import React from 'react';
import PropTypes from 'prop-types'
import Selection from '../Selection';
import ChatBot from '../ChatBot';
import Brief from '../Brief';
import Review from '../Review'
import DesignBrief from '../Task/DesignBrief';
import i18n from "i18next";


const CritiqueBotTask = (props) => {
    const { step, artifactId, ...rest } = props;
    switch (step) {
        case 1:
            return <DesignBrief {...rest} />
        case 2:
            return <Review {...rest} />
        case 3:
            return <Selection {...rest} />
        case 4:
            return <ChatBot ArtifactId={artifactId} bot="gpt3" lang={i18n.language} {...rest} />
        case 5:
            return <Brief  ArtifactId={artifactId} {...rest} />
       
    }
}
CritiqueBotTask.propTypes = {
    step:PropTypes.any,
    artifactId:PropTypes.any
}


export default CritiqueBotTask;
