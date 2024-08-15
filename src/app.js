const epxress = require("express")
const http = require("http")
const socketio = require("socket.io")
const app = epxress()
const server = http.createServer(app)
const io = socketio(server)
const messageModel = require("./models/messageModel")

io.on("connection", socket => {
    console.log("a user connected")

    socket.on('chat message', async (data) => {
        const newMessage = new messageModel({
            username: data.username,
            message: data.message
        })
        await newMessage.save()
        io.emit('chat message', data)
    })

    socket.on('disconnect', () => {
        console.log('A user disconnected')
    })
})


app.set('view engine', 'ejs')

require("./database/index")
require("./middlewares/index")(app)
require("./routes/index")(app)
require("./routes/template-routes")(app)
require("./middlewares/404")(app)
require("./middlewares/ErrorHandler")

require("../server")(server) 
