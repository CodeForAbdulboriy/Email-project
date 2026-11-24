import User from "./user.model.js";
import Message from "./message.model.js";

User.hasMany(Message, {
    foreignKey: "userId"
});
Message.belongsTo(User, {
    foreignKey: "userId"
});

export {
    User,
    Message
}