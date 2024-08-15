require("dotenv").config()

module.exports = (server) => {
    server.listen(3000, () => {
        console.log(`APP is running on port ${3000}`)
    })
}