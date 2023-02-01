import React from 'react';
import { PropTypes } from 'prop-types';
import GoogleMapReact from 'google-map-react';
import RoomIcon from '@mui/icons-material/Room';


const Marker = ({ text }) => <div>{text}<RoomIcon /></div>;

Marker.propTypes = {
    text: PropTypes.string
}

// eslint-disable-next-line no-undef
const apiKey = process.env.REACT_APP_GOOGLE_MAP_API

export default function SimpleMap({ lat = 59.95, lng = 30.33, zoom = 11, style={} }) {

    const styleMerged = Object.assign({}, { height: '50vh', width: '100%' }, style)

    return (
        // Important! Always set the container height explicitly
        <div style={styleMerged}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: apiKey }}
                defaultCenter={{ lat, lng }}
                defaultZoom={zoom}
            >
                <Marker
                    lat={lat}
                    lng={lng}
                    text="Project Location"
                />
            </GoogleMapReact>
        </div>
    );

}
SimpleMap.propTypes = {
    lat: PropTypes.number,
    lng: PropTypes.number,
    zoom: PropTypes.number,
    style:PropTypes.object
}
