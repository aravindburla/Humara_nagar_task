import { DataTypes, Model } from "sequelize";
import { sequelize } from "../helpers/databaseLoader.js";
import Task from "./Task.js";

class User extends Model {}

User.init(
  {
    id: {
      primaryKey: true,
      type: DataTypes.BIGINT,
      autoIncrement: true,
    },

    name: {
      type: DataTypes.STRING,
    },

    email: {
      type: DataTypes.STRING,
    },

    password: {
      type: DataTypes.STRING,
    },

    mobile: {
      type: DataTypes.NUMBER,
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


User.hasMany(Task, {foreignKey: "user_id"});

export default User;

