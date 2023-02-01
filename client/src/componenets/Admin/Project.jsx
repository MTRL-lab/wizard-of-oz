import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import ProjectTab from 'components/Project/ProjectDescription';
import ArtifactsTab from 'views/Project/Artifacts';
import PaymentsTab from 'views/Project/Payments';
import TasksTab from 'views/Project/Tasks';
import WorkersTab from 'views/Project/Workers';

class ProjectPage extends React.Component {
    state = {
        tabIndex: 0,
    };

    handleChange = (event, tabIndex) => {
        this.setState({tabIndex});
    };
    render() {
        const {match, classes} = this.props;
        const {tabIndex} = this.state;
        const projectId = match.params.projectId;

        return (
            <div className={classes.root}>
                <Tabs value={tabIndex} onChange={this.handleChange}>
                    <Tab label="Project Brief" />
                    <Tab label="Artifacts" />
                    <Tab label="Payments" />
                    <Tab label="Tasks" />
                    <Tab label="Workers" />
                </Tabs>
                {tabIndex === 0 && (
                    <TabContainer>
                        <ProjectTab projectId={projectId} />
                    </TabContainer>
                )}
                {tabIndex === 1 && (
                    <TabContainer>
                        <ArtifactsTab projectId={projectId} {...this.props} />
                    </TabContainer>
                )}
                {tabIndex === 2 && (
                    <TabContainer>
                        <PaymentsTab projectId={projectId} {...this.props} />
                    </TabContainer>
                )}
                {tabIndex === 3 && (
                    <TabContainer>
                        <TasksTab projectId={projectId} {...this.props} />
                    </TabContainer>
                )}
                {tabIndex === 4 && (
                    <TabContainer>
                        <WorkersTab projectId={projectId} {...this.props} />
                    </TabContainer>
                )}
            </div>
        );
    }
}

ProjectPage.propTypes = {
    classes: PropTypes.object.isRequired,
};

const styles = theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background,
    },
});

function TabContainer(props) {
    return (
        <div style={{padding: 8 * 3, background: 'transparent'}}>
            {props.children}
        </div>
    );
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
};

export default withStyles(styles)(ProjectPage);
