import React from 'react';
import PropTypes from "prop-types"

import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from "@mui/material/InputLabel"
import FormLabel from '@mui/material/FormLabel';
import RadioGroup from "@mui/material/RadioGroup"
import FormControlLabel from "@mui/material/FormControlLabel"
import Radio from "@mui/material/Radio"

export default function GroupField({ id, label, items, onChange, value, style }) {

    return <FormControl>
        <FormLabel id="demo-radio-buttons-group-label">{label}</FormLabel>
        <RadioGroup
            style={style} required
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="female"
            name={id}
            onChange = {onChange}
            value = {value}
        >
            {items.map((loc, i) => <FormControlLabel value={i} key={i} control={<Radio />} label={loc} />)}
        </RadioGroup>
    </FormControl>
}

GroupField.propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    items: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.any,
    style: PropTypes.object
}
export function SelectField({ id, label, items, onChange, value,style }) {

    return <FormControl style={style} required>
        <InputLabel id={`${id}-label`}>{label}</InputLabel>

        <Select
            labelId={`${id}-label`}
            id={id}
            name={id}
            value={value}
            label={label}
            onChange={onChange}
        >
            {items.map((loc, i) => <MenuItem value={i} key={i}>{loc}</MenuItem>)}
        </Select>
    </FormControl>
}

SelectField.propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    items: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.any,
    style: PropTypes.object
}
