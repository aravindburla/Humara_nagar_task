import {Sequelize} from "sequelize"
// Sequlize connection setup
export const sequelize = new Sequelize(
    "task",
    "postgres",
    "root",
    {
        dialect: "postgres",
        host: "localhost",
        port: 5432,
        native: false,
        logging: true,

    }
);

export const databaseLoader = async () => {
    sequelize
        .sync()
        .then(async () => {
            console.log("Database Connected");
        })
        .catch((err) => {
            console.log("An Error Occured: ", String(err));
        });
};