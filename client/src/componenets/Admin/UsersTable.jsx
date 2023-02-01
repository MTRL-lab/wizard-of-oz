import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Table from 'components/Table/Table.jsx';
import Card from 'components/Card/Card.jsx';
import CardHeader from 'components/Card/CardHeader.jsx';
import CardBody from 'components/Card/CardBody.jsx';
import Chip from '@material-ui/core/Chip';
import AddIcon from '@material-ui/icons/AddCircleOutline';

import dashboardStyle from 'assets/jss/material-dashboard-react/views/dashboardStyle.jsx';

import api from 'services/api';

const styles = {
    root: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
    },
};
const userTableHelper = (data, onDelete, onAdd) =>
    data.result.map(row => {
        const roles = {
            designer: false,
            reviewer: false,
            set_creator: false,
            divider: false,
            merger: false,
        };
        const userRoles = (row.roles && row.roles.split(',')) || [];
        userRoles.map(role => (roles[role] = true));

        return [
            <React.Fragment>
                {row.fname} {row.lname}
            </React.Fragment>,
            <div className={styles.root}>
                {Object.keys(roles).map(role => {
                    if (roles[role]) {
                        return (
                            <Chip
                                label={role}
                                onDelete={() => onDelete(row.id, role)}
                                color="primary"
                                variant="outlined"
                                // className={classes.chip}
                            />
                        );
                    } else {
                        return (
                            <Chip
                                icon={<AddIcon />}
                                label={role}
                                onClick={() => onAdd(row.id, role)}
                                color="secondary"
                                variant="outlined"
                                // className={classes.chip}
                            />
                        );
                    }
                })}
            </div>,
        ];
    });

class UsersTable extends React.Component {
    state = {
        users: [],
        error: false,
    };
    constructor(props) {
        super(props);
        this.onDelete = this.onDelete.bind(this);
        this.onAdd = this.onAdd.bind(this);
        this.setError = this.setError.bind(this);
    }
    componentDidMount() {
        const {projectId} = this.props;

        api.get('/api/users', {ProjectId: projectId}).then(users =>
            this.setState({
                users: userTableHelper(users, this.onDelete, this.onAdd),
            }),
        );
    }
    onDelete(AccountId, role) {
        const {projectId} = this.props;
        api.del('/api/projects/' + projectId + '/role', {
            AccountId,
            role,
        })
            .then(() => this.componentDidMount())
            .catch(error => this.setError(error));
    }
    onAdd(AccountId, role) {
        const {projectId} = this.props;
        api.post('/api/projects/' + projectId + '/role', {
            AccountId,
            role,
        })
            .then(() => this.componentDidMount())
            .catch(error => this.setError(error));
    }
    setError(error) {
        this.props.onError(error);
    }
    render() {
        const {classes} = this.props;
        const {users} = this.state;
        return (
            <Card>
                <CardHeader color="success">
                    <h4 className={classes.cardTitleWhite}>Participants</h4>
                </CardHeader>
                <CardBody>
                    <Table
                        tableHeaderColor="success"
                        tableHead={['Name', 'Roles']}
                        tableData={users}
                    />
                </CardBody>
            </Card>
        );
    }
}

export default withStyles(dashboardStyle)(UsersTable);
