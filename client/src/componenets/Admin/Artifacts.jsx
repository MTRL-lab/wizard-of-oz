import React from 'react';
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
import * as qs from 'query-string';
import {Link} from 'react-router-dom';

// core components
import GridItem from 'components/Grid/GridItem.jsx';
import GridContainer from 'components/Grid/GridContainer.jsx';
import ArtifactItem from 'components/TaskArtifactSet/ArtifactItem';
import Typography from '@material-ui/core/Typography';
import Button from 'components/CustomButtons/Button';
import api from 'services/api';

class TableList extends React.Component {
    state = {
        artifacts: false,
        project: false,
    };
    componentDidMount() {
        const {match, location} = this.props;
        const {projectId} = match.params;

        const ArtifactId = qs.parse(location.search).ArtifactId;

        const where = {ProjectId: projectId};
        if (ArtifactId) where.id = ArtifactId;
        Promise.all([
            api.get('/api/artifacts', where),
            api.get('/api/projects/' + projectId),
        ]).then(([artifacts, project]) => {
            this.setState({
                artifacts: artifacts.result,
                project: project.result,
            });
        });
    }
    render() {
        const {classes} = this.props;
        const {artifacts, project} = this.state;
        return (
            <GridContainer>
                {artifacts &&
                    artifacts.map(artifact => {
                        return (
                            <GridItem
                                xs={12}
                                sm={12}
                                key={'artifact_' + artifact.id}
                            >
                                <Typography variant="h6" color="textSecondary">
                                    ID: {artifact.id}{' '}
                                    {artifact.active && 'Active'}
                                    {!artifact.active && 'Inactive'}
                                </Typography>
                                <Button
                                    color="success"
                                    component={Link}
                                    to={`/app/artifact/${artifact.id}/edit/`}
                                >
                                    Edit
                                </Button>
                                {artifact.active && (
                                    <Button color="warning">Deactivate</Button>
                                )}
                                {!artifact.active && (
                                    <Button color="danger">Activate</Button>
                                )}
                                <ArtifactItem
                                    project={project}
                                    artifact={artifact}
                                />
                            </GridItem>
                        );
                    })}
            </GridContainer>
        );
    }
}
const styles = {};
export default withStyles(styles)(TableList);
