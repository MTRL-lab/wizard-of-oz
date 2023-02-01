import React, { Component } from 'react';
import PropTypes from "prop-types"
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import Box from '@mui/material/Box';
import MobileStepper from '@mui/material/MobileStepper';
import Button from '@mui/material/Button';


const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

// eslint-disable-next-line no-undef
const imagesPath = process.env.REACT_APP_SERVER_MEDIA

// const width = {
//     width: '100%',
// };
const iframe = {
    width: '100%',
    height: '500px',
};


const isImage = (fileName) => {
    const lowerFileName = fileName.toLowerCase()
    return lowerFileName.endsWith('.png') || lowerFileName.endsWith('.jpg') || lowerFileName.endsWith('.jpeg')
}

const steps = (uploads) => {
    if (!uploads || !uploads.length)  return 0

    return uploads.reduce((acc,item)=> {
        isImage(item.file) ? acc++ : acc
        return acc;
    } , 0)
}


class Artifact extends Component {
    state = {
        shown: false,
        activeStep: 0
    };

    handleClick = event => {
        const url = event.target.src;
        window.open(url, 'preview', 'toolbar=0,status=0');
    };


    handleNext = () => {
        const { activeStep } = this.state;
        this.setState({ activeStep: activeStep + 1 });
    }

    handleBack = () => {
        const { activeStep } = this.state;
        this.setState({ activeStep: activeStep - 1 });
    }

    handleStepChange = (activeStep) => {
        this.setState({ activeStep});
    }


    show = () => {
        this.setState({ shown: true });
    };

    render() {
        const { artifact, onlyImage, autoPlay } = this.props;
        const { activeStep } = this.state;

        const SwipeElm = autoPlay ? AutoPlaySwipeableViews : SwipeableViews
        const maxSteps = artifact && artifact.ArtifactUploads ? steps(artifact.ArtifactUploads): 0;
        const rtl = document.body.dir === 'rtl'
        // maxWidth: 600,
        return (
            <Box sx={{  flexGrow: 1 }}> 
               
                {artifact && artifact.ArtifactUploads && !!artifact.ArtifactUploads.length &&
                    <>
                        <SwipeElm
                            axis={rtl ? 'x-reverse' : 'x'}
                            index={activeStep}
                            onChangeIndex={this.handleStepChange}
                            enableMouseEvents
                        >
                            {artifact.ArtifactUploads.map((tile, key) => {
                                if (tile.file.endsWith('.dwg')) {
                                    if (!onlyImage) {
                                        return (
                                            <div key={key}>
                                                <iframe
                                                    style={iframe}
                                                    frameBorder="0"
                                                    title={tile}
                                                    src={`//sharecad.org/cadframe/load?url=${imagesPath}${tile.file
                                                        }`}
                                                    scrolling="no"
                                                />
                                                <a href={imagesPath + tile.file}>
                                                    Download
                                                </a>
                                            </div>
                                        );
                                    }
                                    return null;
                                }

                                return isImage( tile.file) ? (
                                    <Box
                                        component="img"
                                        key={'ArtifactUploads' + tile.id}
                                        sx={{
                                            // height: 255,
                                            display: 'block',
                                            // maxWidth: 600,
                                            overflow: 'hidden',
                                            width: '100%',
                                        }}
                                        src={imagesPath + tile.file}
                                        alt="Idea"
                                    />

                                ): <></>
                            })}

                        </SwipeElm>
                        <MobileStepper
                            steps={maxSteps}
                            position="static"
                            activeStep={activeStep}
                            nextButton={
                                <Button
                                    size="small"
                                    onClick={this.handleNext}
                                    disabled={activeStep === maxSteps - 1}
                                >
                                    Next
                                    {rtl ? (
                                        <KeyboardArrowLeft />
                                    ) : (
                                        <KeyboardArrowRight />
                                    )}
                                </Button>
                            }
                            backButton={
                                <Button size="small" onClick={this.handleBack} disabled={activeStep === 0}>
                                    {rtl ? (
                                        <KeyboardArrowRight />
                                    ) : (
                                        <KeyboardArrowLeft />
                                    )}
                                    Back
                                </Button>
                            }
                        />
                    </>}
            </Box>

        );
    }
}

Artifact.defaults = {
    onlyImage:
        false,
};
Artifact.propTypes = {
    artifact: PropTypes.any,
    onlyImage: PropTypes.bool,
    autoPlay:PropTypes.bool
}

export default Artifact;
