import React from "react";
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Typography from "@mui/material/Typography";

import NextButton from "../Task/NextButton"

import sketch_example1 from '../../assets/img/schema/architect-sketch.jpg';
import sketch_example2 from '../../assets/img/schema/Architectural-Sketch-Series-Schematic-Design-01.webp';
import sketch_example3 from '../../assets/img/schema/Architectural-Sketch-Series-Schematic-Design-02.webp';
import sketch_example4 from '../../assets/img/schema/Architectural-Sketch-Series-Schematic-Design-03.webp';
import sketch_example5 from '../../assets/img/schema/Architectural-Sketch-Series-Schematic-Design-05.webp';
import sketch_example6 from '../../assets/img/schema/Architectural-Sketch-Series-Schematic-Design-06.webp'
import sketch_example7 from '../../assets/img/schema/Architectural-Sketch-Series-Schematic-Design-08.webp'
import sketch_example8 from '../../assets/img/schema/Architectural-Sketch-Series-Schematic-Design-11.webp'
import sketch_example9 from '../../assets/img/schema/Architectural-Sketches-by-Bob-Borson-02.webp';
import sketch_example10 from '../../assets/img/schema/design-sketches.jpg';

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


class SchemaTaskDescription extends React.Component {

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
                                <Typography variant="h5">What is a Schema?</Typography>
                                <p>
                                    A schema is a plan diagram that shows the
                                    relationships between rooms, spaces and other
                                    physical features at one level of a structure.
                                    Dimensions are usually drawn between the walls to
                                    specify room sizes and wall lengths. Floor plans
                                    will also include details of fixtures like sinks,
                                    water heaters, furnaces, etc. Floor plans will
                                    include notes to specify finishes, construction
                                    methods, or symbols for electrical items.

                                </p>
                                <h5>Tips:</h5>
                                <p>Make the schema quick but use scale so the spaces make sense</p>
                                <p>Distigiush between public and private space</p>
                                <p>Think about light - where is it open? where closed?</p>
                                <p>Think about masses and how the related or connect</p>
                                <p>Think about movement of people in the spaces</p>

                                <p>Add furniture to suggest the function of the space</p>

                                <p>Make multiple skethces and choose the one you like most</p>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <iframe
                            title="Model preview"
                            src="https://www.youtube.com/embed/R7YxG4nsqeg?autoplay=1&amp;controls=0&amp;mute=1&amp;modestbranding=1&amp;iv_load_policy=3&amp;loop=1&amp;rel=0&amp;showinfo=0&amp;yt=stretch=16:9&amp;autohide=1&amp;start=326&amp;end=380"
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



export default SchemaTaskDescription;
