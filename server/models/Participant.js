import DataTypes from 'sequelize'
import initDb from "../lib/db.js";
import { sendToken } from "../lib/email.js"


const { db } = initDb()

const Participant = db.define('Participant', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    email: {
        type: DataTypes.STRING(64),
        allowNull: false,
        unique: true,
        validate: { isEmail: true, len: [5, 64] },
    },
    password: {
        type: DataTypes.STRING(6),
        allowNull: false,
    },
    fname: {
        type: DataTypes.STRING(32),
        allowNull: false,
        validate: { len: [2, 32] },
    },
    lname: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    location: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    connection: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    gender: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: -1,
    },
    year: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
    },
    loginAttempts: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    consent: {
        type: DataTypes.JSON,
        allowNull: true,
    },
    education: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    experience: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    live: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    admin: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
});


Participant.prototype.toJSON =  function () {
  var values = Object.assign({}, this.get());

  delete values.password;
  delete values.email;
  delete values.admin;
  delete values.loginAttempts;
  return values;
}


Participant.generateCode = () => {

    let code = Math.random().toString(36).slice(7) + Math.random().toString(36).slice(7)
    code = code.substring(3,9).toUpperCase()
    return new Promise (resolve => resolve( code))
}

Participant.sendToken = (participant) => {
    return sendToken(participant.email, participant.password)

}

export default Participant