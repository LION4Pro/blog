const mongoose = require("mongoose")


function connect_db() {
    try {
        mongoose.connect('mongodb+srv://LoN:amiraliminro44pro@cluster0.h2k4e.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0').then()
        console.log('connect is successfuly')

    } catch (error) {
        console.log(error)
    }
}

module.exports = { connect_db }