const mongoose = require("mongoose")

const postModel = new mongoose.Schema({
    author: {type: String},
    image: {type: String},
    title: {type: String},
    text: {type: String},
    lastPosted: {type: Date, defualt: Date.now()}
})

const Post = mongoose.model("Post", postModel)
module.exports = Post