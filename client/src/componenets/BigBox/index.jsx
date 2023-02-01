import React from "react"
import PropTypes from "prop-types";
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

const style = {
    maxWidth:800,
    marginTop:100,
    marginBottom:100
}
const BigBox = function({headline,secondary, description, children}) {

    return <Card style={style}>
                <CardContent>
                {secondary && <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>{secondary}</Typography>}
                {headline && <Typography variant="h5" component="div" gutterBottom>{headline}</Typography>}
                {description  && <Typography variant="body2" gutterBottom>{description}</Typography>}
                    {children}
                </CardContent>
            </Card>
}

BigBox.propTypes = {
    headline: PropTypes.string,
    secondary:PropTypes.string,
    description:PropTypes.string,
    children:PropTypes.element
}

export default BigBox