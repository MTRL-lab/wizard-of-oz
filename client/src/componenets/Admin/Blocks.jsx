import React, { Component } from 'react';

import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';

import ErrorMessage from '../ErrorMessage';
import { Link } from 'react-router-dom';

import api from '../../services/api';

const queryParams = () => {
    return new Proxy(new URLSearchParams(window.location.search), {
        get: (searchParams, prop) => searchParams.get(prop),
    });
}

class BlockAdmin extends Component {
    state = {
        blocks: [],
        error: false,
    };

    componentDidMount() {
        const params = queryParams()
        const projectId = params.projectId;

        api.get('/tasks/blocks', { ProjectId: projectId })
            .then((blocks) =>
                this.setState({
                    blocks
                }),
            )
            .catch(e => this.setError(e));
    }
    onError = (error) => {
        this.setState({
            error:
                error.response && error.response.data
                    ? error.response.data.message
                    : error + '',
        });
    }
    render() {
        const params = queryParams()
        const projectId = params.projectId;
        const { error, blocks } = this.state;
        
        if (!projectId) {
            return "Missing ProjectId"
        }
        return (
            <Grid container sx={{ background: '#fff' }}>
                <Grid item xs={12} md={12}>
                    <Stack direction="row" spacing={2} sx={{ p: 2 }}>
                        {blocks.map((block, key) => <Paper key={key} sx={{ p: 4 }}>
                            <Link to={'block/' + block.id}>
                                {block.kind}
                            </Link>
                        </Paper>)}
                        <Paper sx={{ p: 4 }}>
                            + New
                        </Paper>
                    </Stack>
                </Grid>

                <ErrorMessage
                    error={error}
                    action={() => this.setState({ error: false })}
                />
            </Grid>
        );
    }
}

export default BlockAdmin;
