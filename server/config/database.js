import { Sequelize } from "sequelize";
import { configDotenv } from "dotenv";

configDotenv();

const db = new Sequelize("notes_cloud", process.env.USER, process.env.PASSWORD, {
    host: process.env.HOST,
    dialect: "mysql"
});

export default db;