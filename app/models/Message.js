import DataTypes from 'sequelize'
import moment from 'moment'
import { db } from "../lib/db.js";


const Message = db.define('Message', {
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
        img: 'logo.png',
        msg: message.get('msg'),
        date: moment(date).format('Do MMM'),
        time: moment(date).format('h:mma'),
    }
}

Message.saveVideo = (message, file) => {
    return new Promise((resolve, reject) => {
        file.mv(`./uploads/video${message.get('id')}.mp4`, (err) => err ? reject(err) : resolve())
    })
}
export default Message