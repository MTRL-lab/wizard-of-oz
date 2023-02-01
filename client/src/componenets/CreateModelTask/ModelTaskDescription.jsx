import React from "react";
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Typography from "@mui/material/Typography";

import NextButton from "../Task/NextButton"

import sketch_example1 from '../../assets/img/model/3dmodel_example1.jpg';
import sketch_example2 from '../../assets/img/model/3dmodel_example2.jpg';
import sketch_example3 from '../../assets/img/model/3dmodel_example3.jpg';
import sketch_example4 from '../../assets/img/model/3dmodel_example4.jpg';
import sketch_example5 from '../../assets/img/model/3dmodel_example5.jpg';
import sketch_example6 from '../../assets/img/model/3dmodel_example6.jpg'
import sketch_example7 from '../../assets/img/model/3dmodel_example7.jpg'
import sketch_example8 from '../../assets/img/model/3dmodel_example8.jpg'

const sketch_example = [
    sketch_example1,
    sketch_example2,
    sketch_example3,
    sketch_example4,
    sketch_example5,
    sketch_example6,
    sketch_example7,
    sketch_example8,
];


class ModelTaskDescription extends React.Component {

    state = {
        artifact: {}
    }

    handleClick(event) {
        const url = event.target.src;
        window.open(url, 'preview', 'toolbar=0,status=0');
    }

    render() {
        return (
            <>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <Card>
                            <CardContent>
                                <Typography variant="h5">What is a Model?</Typography>
                                <p>
                                    An architectural model is a type of scale model – a digital representation of a structure – built to study aspects of an architectural design or to communicate design ideas.
                                </p>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <iframe
                            title="Model preview"
                            src="https://www.youtube.com/embed/roruGO9Y4r8?autoplay=1&amp;controls=1&amp;mute=1&amp;modestbranding=1&amp;iv_load_policy=3&amp;loop=1&amp;rel=0&amp;showinfo=0&amp;yt=stretch=16:9&amp;autohide=1&amp;start=5"
                            width="100%"
                            height="315"
                            allowtransparency="true"
                            frameBorder="0" />
                    </Grid>
                </Grid>

                <Card style={{ marginTop: 30 }}>
                    <CardContent>
                        <Typography variant="h5">Output examples</Typography>

                        <ImageList variant="masonry" cols={3}>
                            {sketch_example.map(tile => (
                                <ImageListItem key={tile.img}>
                                    <img id={'example_' + tile} src={tile} alt='Example' onClick={this.handleClick} />
                                </ImageListItem>
                            ))}
                        </ImageList>
                    </CardContent>
                </Card>
                <NextButton />
            </>
        );
    }
}



export default ModelTaskDescription;
