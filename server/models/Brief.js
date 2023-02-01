import DataTypes from "sequelize";
import initDb from "../lib/db.js";

const {db} = initDb()

const Brief = db.define("Brief", {
  content: {
    type: DataTypes.STRING(2048),
  },

  isValid: {
    type: DataTypes.STRING,
  },
});

export default Brief;
