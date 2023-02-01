import React from 'react';
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
// // core components
import GridItem from 'components/Grid/GridItem';
import GridContainer from 'components/Grid/GridContainer';

// import Button from 'components/CustomButtons/Button';
import UsersTable from 'components/Admin/UsersTable';
import TaskTable from 'components/Admin/TaskTable';
import PaymentTable from 'components/Admin/PaymentTable';


import dashboardStyle from 'assets/jss/material-dashboard-react/views/dashboardStyle';

class UserAdmin extends React.Component {
    state = {
        error: false,
    };
    constructor(props) {
        super(props);
        this.onError = this.onError.bind(this);
    }
    onError(error) {
        this.setState({
            error: error.response.data
                ? error.response.data.message
                : error + '',
        });
    }
    render() {
        const {match} = this.props;
        const {projectId} = match.params;
        const {error} = this.state;
        return (
            <GridContainer>
                <GridItem xs={12} md={12}>
                    <PaymentTable
                        projectId={projectId}
                        onError={this.onError}
                    />
                </GridItem>
                <GridItem xs={12} md={12}>
                    <UsersTable projectId={projectId} onError={this.onError} />
                </GridItem>
                <GridItem xs={12} md={12}>
                    <TaskTable projectId={projectId} onError={this.onError} />
                </GridItem>

            </GridContainer>
        );
    }
}

export default withStyles(dashboardStyle)(UserAdmin);
