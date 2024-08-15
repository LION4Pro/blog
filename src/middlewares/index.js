const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const cors = require("cors")
const express = require("express")
const path = require("path")
const flash = require("connect-flash")
const session = require('express-session')

module.exports = (app) => {
    app.use(cors())
    app.use(cookieParser())
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: false }))
    app.use('/images', express.static(path.join(__dirname, 'src/images')))
    app.use('/static', express.static(path.join(__dirname, 'images')))
    app.use(flash())
    app.use(session({
        secret: '9735a582-6e63-4f33-a570-fd4e91bb37e3',
        resave: false,
        saveUninitialized: true
    }))
    app.use((req, res, next) => {
        res.locals.successMessage = req.flash('success')
        res.locals.errorMessage = req.flash('error')
        next()
    })
}
