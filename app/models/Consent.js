import DataTypes from 'sequelize'
import {
    db
} from "../lib/db.js";

const Concent = db.define('Concent', {
    session_id: {
        type: DataTypes.STRING,
    },
    read: {
        type: DataTypes.BOOLEAN,
    },

    answers: {
        type: DataTypes.BOOLEAN,
    },

    consent: {
        type: DataTypes.BOOLEAN,
    },

    name: {
        type: DataTypes.STRING,
    },

});
export default Concent