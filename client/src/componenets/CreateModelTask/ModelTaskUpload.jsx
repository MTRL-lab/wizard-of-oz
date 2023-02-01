import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { withTranslation } from 'react-i18next';

import i18n from "i18next";

import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';


import api, { baseURL } from '../../services/api';

// Import React FilePond
import { FilePond, registerPlugin } from 'react-filepond';

// Import the Image EXIF Orientation and Image Preview plugins
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';

import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';

registerPlugin(
    FilePondPluginImageExifOrientation,
    FilePondPluginImagePreview,
    FilePondPluginFileValidateType,
);


// eslint-disable-next-line no-undef
const imagesPath = process.env.REACT_APP_SERVER_MEDIA

const queryParams = () => {
    return new Proxy(new URLSearchParams(window.location.search), {
        get: (searchParams, prop) => searchParams.get(prop),
    });
}

const server =
{
    instantUpload: true,
    url: `${baseURL}artifacts/upload/`,
    process: {
        withCredentials: true,
    },
    revert: {
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json'
        },
    },
    // restore: './restore/',
    // load: './load/',
    // fetch: './fetch/'

}
class SketchTaskUpdate extends Component {
    state = {
        project: null,
        task: null,
        form: {},
        files: [],
        skp:[],
        isDone: 0,
        notAssigned: false,
        myTask: false,
        error: false,
        artifact: null,
        parent: null
    };

    componentDidMount = () => {

        const params = queryParams();

        if (params.artifactId) {
            api
                .get(`artifacts/${params.artifactId}/?=1&translateTo=${i18n.language}`)
                .then(artifact => Promise.all([artifact, api.get(`artifacts/${artifact.parentId}/?=1&translateTo=${i18n.language}`)]))
                .then(([artifact, parent]) => this.setState({ artifact, parent }))
                .catch(e => console.error(e))
        }
    }

    handleToggle = (checkboes) => {
        const { form } = this.state;
        form.checkboes = checkboes;
        this.setState({ form });
    }

    handleChange = (event) => {
        const { form } = this.state;
        form[event.target.id] = event.target.value;
        this.setState({ form });
    }

    handleSubmit = (event) => {
        event.preventDefault();

        const { task, setDone, setError } = this.props;
        const { form, files, artifact } = this.state;

        // check if we got server answer for each file
        const error = files.reduce(
            (acc, file) => (file.serverId ? false : acc),
            true,
        );
        if (error) {
            return this.props.setError('No files uploaded');
        }

        return api
            .post('artifacts/', {
                taskId: task.id,
                description: form.description,
                parentId: artifact ? artifact.id : 0
            })
            .then(response => {
                return Promise.all(
                    files.map(file => {
                        const fileData = JSON.parse(file.serverId);
                        return api.patch('artifacts/upload/' + fileData.id, {
                            ArtifactId: response.artifact.id,
                        });
                    }),
                );
            })
            .then(() => {
                setDone((1));
            })
            .catch(error => {
                console.error(error);
                setError(error.response.data.error);
            });
    }

    render() {
        const { artifact, parent } = this.state;
        const { t } = this.props
        return (
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <Typography variant="h6" gutterBottom>{t("Steps to follow")}</Typography>

                    <ol>
                        <li>
                            Learn the provided sketches and understand the building mass and space.
                        </li>
                        <li>
                            Create a 3D SketchUp model based on the provided sketches. You will have to solve discrepancies and envision new details that will make the model work.
                        </li>
                        <li>
                            Export several quick renderings and upload them.
                        </li>
                        <li>
                            Save and upload the SKP file.
                        </li>

                    </ol>
                    {artifact && <>
                        <Typography variant="h6" gutterBottom>{t("Develop the following design")}</Typography>
                        <Typography variant="body2" gutterBottom>{artifact.description}</Typography>

                        <Typography variant="body1" gutterBottom>{t("Feedback by community")}</Typography>
                        <Typography variant="body2" gutterBottom>{t("What people liked, and improvement ideas, auto-translated")}</Typography>

                        <ul>
                            {artifact.ArtifactCritiques.map((critique, key1) => {
                                return <li key={key1}><Typography variant="body2" gutterBottom>{critique.description}</Typography></li>

                            })}
                        </ul>
                        <Typography variant="body1" gutterBottom>{t("Base the model on the following design")}</Typography>

                        {artifact.ArtifactUploads.map((tile, key) => {
                            return <ArtifactImage tile={tile} key={key} />

                        })}
                        {parent && parent.ArtifactUploads.map((tile, key) => {
                            return <ArtifactImage tile={tile} key={key} />

                        })}
                    </>
                    }



                </Grid>
                <Grid item xs={12} md={6}>
                    <Card>
                        <CardContent>
                            <form onSubmit={this.handleSubmit}>
                                <FilePond
                                    name="file"
                                    ref={ref => (this.pond = ref)}
                                    files={this.state.files}
                                    acceptedFileTypes={[
                                        'image/png',
                                        'image/jpg',
                                        'image/jpeg',
                                    ]}
                                    labelIdle='Drag &amp; Drop your rendered images or <span class="filepond--label-action"> Browse </span>'

                                    allowMultiple={true}
                                    maxFiles={5}
                                    server={server}
                                    onupdatefiles={fileItems => {
                                        // Set currently active file objects to this.state
                                        this.setState({
                                            files: fileItems.map(
                                                fileItem => fileItem,
                                            ),
                                        });
                                    }}
                                />

                                <FilePond

                                    name="file"
                                    ref={ref => (this.pond = ref)}
                                    files={this.state.skp}
                                    
                                    labelIdle='Drag &amp; Drop your SKP file or <span class="filepond--label-action"> Browse </span>'
                                    allowMultiple={false}
                                    maxFiles={1}
                                    server={server}
                                    onupdatefiles={fileItems => {
                                        // Set currently active file objects to this.state
                                        this.setState({
                                            skp: fileItems.map(
                                                fileItem => fileItem,
                                            ),
                                        });
                                    }}
                                />


                                <Button fullWidth type="submit" variant="contained">
                                    Upload files and finish{' '}
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        );
    }
}

SketchTaskUpdate.propTypes = {
    task: PropTypes.any,
    setError: PropTypes.func,
    t: PropTypes.func,
    setDone: PropTypes.func,
}
export default withTranslation()(SketchTaskUpdate);

const ArtifactImage = ({ key, tile }) => {
    return <Paper key={key} elevation={5} sx={{ marginBottom: 1 }}>

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
    </Paper>
}

ArtifactImage.propTypes = {
    key: PropTypes.string,
    tile: PropTypes.array,
}