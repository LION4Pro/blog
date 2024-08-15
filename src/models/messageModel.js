const mongoose = require("mongoose")

const messageSchema = new mongoose.Schema({
    username: {type: String},
    message: {type: String},
    createdAt: {type: Date, defualt: Date.now},
})

const Message = mongoose.model("blog-chatroom-messages", messageSchema)
module.exports = Message