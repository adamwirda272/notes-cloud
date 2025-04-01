import { DataTypes } from "sequelize";
import db from "../config/database.js";
import user from "./userModels.js";

const notes = db.define("note", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    title: {
        type: DataTypes.STRING
    },
    content: {
        type: DataTypes.TEXT
    },
    user_id: {
        type: DataTypes.UUID,
        allowNull: false
    }
});

notes.belongsTo(user, { foreignKey: "user_id" });
user.hasMany(notes, { foreignKey: "user_id" });

export default notes;