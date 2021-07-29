import DataTypes from "sequelize";
import { db } from "../lib/db.js";

const Brief = db.define("Brief", {
  discussion_id: {
    type: DataTypes.STRING,
  },
  content: {
    type: DataTypes.STRING(2048),
  },

  isValid: {
    type: DataTypes.STRING,
  },
});

export default Brief;
