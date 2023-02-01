import React from 'react';
import PropTypes from 'prop-types'
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import Check from '@mui/icons-material/Check';
import Close from '@mui/icons-material/Close';

function CritiqueItem(props) {
    const {critique} = props;
    return (
        <ListItem key={'ArtifactCritiques' + critique.id}>
            {critique.kind === 'improve' && (
                <Avatar style={{backgroundColor: '#b71c1c'}}>
                    <Close />
                </Avatar>
            )}
            {critique.kind === 'like' && (
                <Avatar style={{backgroundColor: '#1b5e20'}}>
                    <Check />
                </Avatar>
            )}

            <ListItemText
                primary={
                    critique.kind === 'improve'
                        ? 'Thing to improve'
                        : 'Thing to keep'
                }
                secondary={critique.description}
            />
        </ListItem>
    );
}

CritiqueItem.propTypes = {
    critique: PropTypes.any  
}
export default CritiqueItem;
