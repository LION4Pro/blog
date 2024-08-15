const postModel = require("../models/postModel")
const userModel = require("../models/userModel")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const hashPassword = require("../services/hashedPassword")
const ADMIN_SECRET = '25728948-a746-4fb4-9106-f7023050a4e3'

const adminRegister = async (req, res, next) => {
    const { username, email, password } = req.body
    try {

        const hashPass = await hashPassword(password)
        const newAdmin = await userModel({
            username,
            email,
            password: hashPass,
            role: 'admin'
        })

        await newAdmin.save()
        req.flash('success', 'admin successfuly added!')
        res.redirect('/dashboard/newAdmin')

    } catch (error) {
        next(error)
    }
}

const adminLogin = async (req, res, next) => {

    const { email, password } = req.body

    try {

        const existsAdmin = await adminModel.findOne({ email })
        if (!existsAdmin) {
            return res.status(404).send('admin not found')
        }


        const payload = { id: existsAdmin.id, email: existsAdmin.email, role: existsAdmin.role }
        console.log(payload)
        const token = jwt.sign(payload, ADMIN_SECRET, { expiresIn: '7d' })
        res.cookie('token', token)

        res.redirect("/admin")

    } catch (error) {
        next(error)
    }
}

const deletePost = async (req, res, next) => {
    const id = req.params.id
    console.log(id)
    try {

        const existsPost = await postModel.findById(id)
        if (!existsPost) {
            console.log('not found')
        }
        await postModel.deleteOne({ _id: id })
        req.flash("success", `the post with title "${existsPost.title}" successfuly removed`)
        return res.redirect("/dashboard/posts")



    } catch (error) {
        next(error)
    }
}

module.exports = { deletePost, adminRegister, adminLogin }