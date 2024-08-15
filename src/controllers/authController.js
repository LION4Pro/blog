const userModel = require("../models/userModel")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const APP_SECRET = '7a995d5a-a110-4924-b0bb-de4f457de8bd'

const register = async (req, res, next) => {
    const { username, email, password } = req.body

    try {

        const newUser = await new userModel({
            username,
            email,
            password: await bcrypt.hash(password, 10),
            role: 'user'
        })

        res.redirect("/login")
        await newUser.save()

    } catch (err) {
        next(err)
    }
}

const login = async (req, res, next) => {

    const { email, password } = req.body


    try {

        const findUser = await userModel.findOne({ email: email })
        if (!findUser) { res.status(404).json({ message: 'user not found' }) }
        let comparePassword = await bcrypt.compare(password, findUser.password)

        if (comparePassword) {

            const payload = { id: findUser._id, username: findUser.username , email: findUser.email, role: findUser.role }
            const token = jwt.sign(payload, APP_SECRET, { expiresIn: '7d' })
            res.cookie('token', token)

            res.redirect("/dashboard")

        }

    } catch (err) {
        next(err)
    }
}

module.exports = {
    register,
    login
}