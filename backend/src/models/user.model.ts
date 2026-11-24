import db from "../db.js";
import { DataTypes, UUIDV4, Model } from "sequelize";

class User extends Model {
    declare id: string;
    declare email: string;
    declare password: string;
}

User.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: UUIDV4,
            primaryKey: true
        },
        password: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING,
            unique: true
        }
    },
    {
        sequelize: db,
        tableName: "users",
        timestamps: true
    }
);

export default User;