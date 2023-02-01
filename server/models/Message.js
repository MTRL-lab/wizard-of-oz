import DataTypes from 'sequelize'
import moment from 'moment'
import initDb from "../lib/db.js";

const {db} = initDb()


const Message = db.define('Message', {

    discussion_id: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    session_id: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    msg: {
        type: DataTypes.STRING(4000),
        allowNull: false,
    },
    username: {
        type: DataTypes.STRING(128),
        allowNull: false,
    }

}, {
    timestamps: true,
    createdAt: true,
    updatedAt: true
});

Message.toChatJson = (message) => {

    const date = moment(message.get('updatedAt'))
    return {
        id: message.get('id'),
        username: message.get('username'),
        msg: message.get('msg'),
        date: moment(date).format('Do MMM'),
        time: moment(date).format('h:mma'),
        audio: message.audio || false,
        language: message.get('language'),
    }
}

export default Message