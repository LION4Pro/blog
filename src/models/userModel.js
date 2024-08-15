const mongoose = require("mongoose")

const userModel = new mongoose.Schema({
    username: { type: String },
    email: { type: String },
    password: { type: String },
    role: { type: String, default: 'user' },
    createdAt: { type: Date, default: Date.now() }
})

const User = mongoose.model('blog-users', userModel)
module.exports = User