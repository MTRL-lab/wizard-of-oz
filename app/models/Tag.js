import DataTypes from "sequelize";
import { db } from "../lib/db.js";

const Tag = db.define("Tag",{
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    messageId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    createdAt: true,
    updatedAt: true,
  }
);


export default Tag;
