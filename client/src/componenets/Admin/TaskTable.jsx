/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import {Link} from 'react-router-dom';

import { DataGrid } from '@mui/x-data-grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
        field: 'TaskBlockId',
        headerName: 'Block Id',
        editable: false,
    },
    {
        field: 'kind',
        headerName: 'Task Kind',
        editable: false,
    },
    {
        field: 'status',
        headerName: 'Status',
        editable: false,
    },
    {
        field: 'ParticipantId',
        headerName: 'Participant Id',
        type: 'number',
        editable: false,
    },
    {
        field: 'ArtifactId',
        headerName: 'Artifact Id',
        type: 'number',
        editable: false,
    }
];

class TaskTable extends Component {
    state = {
        newPageSize: 50,

    };


    setError = (error) => {
        this.props.onError(error);
    }


    render() {
        const { newPageSize } = this.state;
        const { tasks, onSelectionModelChange } = this.props;
        return (
            <Card>
                <CardContent>
                    <div style={{ height: 400, width: '100%' }}>
                        <div style={{ display: 'flex', height: '100%' }}>
                            <DataGrid
                                rows={tasks}
                                columns={columns}
                                pageSize={newPageSize}
                                onPageSizeChange={(newPageSize) => this.setState({ newPageSize })}
                                onSelectionModelChange={onSelectionModelChange}
                                rowsPerPageOptions={[5, 10, 20]}
                                pagination
                                checkboxSelection
                                disableSelectionOnClick
                            />

                        </div>
                    </div>

                </CardContent>
            </Card>
        );
    }


}

TaskTable.propTypes = {
    tasks: PropTypes.array.isRequired,
    artifacts: PropTypes.array.isRequired,
    participants: PropTypes.array.isRequired,
    onError: PropTypes.func.isRequired,
    onSelectionModelChange: PropTypes.func
}


export default TaskTable;
