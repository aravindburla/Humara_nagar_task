import { DataTypes, Model } from "sequelize";
import { sequelize } from "../helpers/databaseLoader.js";

class Task extends Model {}

Task.init(
  {
    id: {
      primaryKey: true,
      type: DataTypes.BIGINT,
      autoIncrement: true,
    },

    name: {
      type: DataTypes.STRING,
    },

    user_id: {
      type: DataTypes.BIGINT
    },

    description: {
      type: DataTypes.STRING,
    },

    completed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },

  },
  {
    tableName: "users",
    sequelize,
    underscored: true,
    timestamps: true,
    paranoid: true,
  }
);



export default Task;
