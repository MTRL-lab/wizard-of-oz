import React from "react";
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Typography from "@mui/material/Typography";

import NextButton from "../Task/NextButton"

import sketch_example1 from '../../assets/img/sketch/sketch_example1.jpg';
import sketch_example2 from '../../assets/img/sketch/sketch_example2.jpg';
import sketch_example3 from '../../assets/img/sketch/sketch_example3.jpg';
import sketch_example4 from '../../assets/img/sketch/sketch_example4.jpg';
import sketch_example5 from '../../assets/img/sketch/sketch_example5.jpg';
import sketch_example6 from '../../assets/img/sketch/sketch_example6.jpg';
import sketch_example7 from '../../assets/img/sketch/sketch_example7.jpg';
import sketch_example8 from '../../assets/img/sketch/sketch_example8.jpg';
import sketch_example9 from '../../assets/img/sketch/sketch_example9.jpg';
import sketch_example10 from '../../assets/img/sketch/sketch_example10.jpg';

const sketch_example = [
    sketch_example1,
    sketch_example2,
    sketch_example3,
    sketch_example4,
    sketch_example5,
    sketch_example6,
    sketch_example7,
    sketch_example8,
    sketch_example9,
    sketch_example10
];


class SketchTaskDescription extends React.Component {

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
                                <Typography variant="h5">What is a Skecth?</Typography>
                                <p>
                                    Concept drawings or sketches are drawings, often freehand, that are used by
                                    designers such as architects, engineers and interior designers as a quick and
                                    simple way of exploring initial ideas for designs. They are not intended to be
                                    accurate or definitive, merely a way of investigating and communicating design
                                    principles and aesthetic concepts.
                                </p>
                                <p>
                                    Concept drawings can also be used to explore more technical aspects of a design,
                                    providing an initial response and possible solutions to problems, constraints
                                    and opportunities such as services layout, structure, method of construction,
                                    solar paths and shading, prevailing wind, patterns of circulation, relationships
                                    between aspects of the site and so on.
                                </p>
                                <p>
                                    Concept drawings, using pencils or felt tip pens and paper can provide a more
                                    fluid, expressive and faster method for investigating a problem, than more
                                    hi-tech approaches such as computer aided design or building information
                                    modelling which can be restrictive in terms of the precision they require and
                                    the rules they impose on the way an image is constructed.

                                </p>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <iframe
                            src="https://www.youtube.com/embed/VFDIg7otgIg?autoplay=1&amp;controls=0&amp;mute=1&amp;modestbranding=1&amp;iv_load_policy=3&amp;loop=1&amp;rel=0&amp;showinfo=0&amp;yt=stretch=16:9&amp;autohide=1&amp;start=70&amp;end=300"
                            width="100%"
                            height="315"
                            allowtransparency="true"
                            frameBorder="0"></iframe>
                    </Grid>
                </Grid>

                <Card style={{marginTop:30}}>
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
                <NextButton to={"?step=2"}/>
            </>
        );
    }
}



export default SketchTaskDescription;
