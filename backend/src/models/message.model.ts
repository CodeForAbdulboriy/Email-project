import db from "../db.js";
import { Model, DataTypes, UUIDV4 } from "sequelize";

class Message extends Model {
    declare id: string;
    declare text: string;
    declare from: string;
    declare to: string;
    declare userId: string;
}

Message.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: UUIDV4,
            primaryKey: true
        },
        text: {
            type: DataTypes.STRING
        },
        from: {
            type: DataTypes.STRING
        },
        to: {
            type: DataTypes.STRING
        },
        userId: {
            type: DataTypes.UUID,
            references: {
                model: "users",
                key: "id"
            }
        }
    },
    {
        sequelize: db,
        tableName: "messages",
        timestamps: true
    }
);

export default Message;