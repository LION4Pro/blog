const postModel = require("../models/postModel")
const userModel = require("../models/userModel")
const messageModel = require("../models/messageModel")
const { authenticationToken, authorizeRole } = require("../middlewares/authentication")

module.exports = (app) => {

    app.get('/', async (req, res) => {
        let token = req.cookies.token
        const Posts = await postModel.find({})
        res.render("index", { token: token, posts: Posts })
    })

    app.get('/register', (req, res) => {
        res.render("register")
    })

    app.get('/login', (req, res) => {
        res.render("login")
    })

    app.get('/dashboard', authenticationToken, async (req, res) => {
        const totalUsers = (await userModel.find({})).length
        const totalPost = (await postModel.find({})).length
        const lastPost = (await postModel.find({})).pop()
        const lastRegistred = (await userModel.find({})).pop()
        const admin = req.user.role === 'admin'
        const owner = req.user.role === 'owner'
        res.render("dashboard", { admin, owner, totalUsers, totalPost, lastPost, lastRegistred })
    })

    app.get('/post/:id', async (req, res) => {
        const post = await postModel.findById(req.params.id)
        res.render("post", { post: post })
    })

    app.get('/admin', authenticationToken, authorizeRole('admin'), async (req, res) => {
        const Posts = await postModel.find({})
        res.render("admin", { posts: Posts })
    })

    app.get('/admin/post/:id', async (req, res) => {
        const post = await postModel.findById(req.params.id)
        res.render("admin-edit-post", { post: post })
    })

    app.get('/admin/register', authenticationToken, async (req, res) => {
        res.render("admin-register")
    })

    app.get('/admin/login', authenticationToken, async (req, res) => {
        res.render("admin-login")
    })

    app.get('/dashboard/newAdmin', authenticationToken, authorizeRole('owner'), async (req, res) => {
        res.render("add-admin")
    })

    app.get('/dashboard/newPost', authenticationToken, async (req, res) => {
        const username = req.user.username
        res.render("add-post", { username })
    })

    app.get('/dashboard/posts', authenticationToken, authorizeRole('admin', 'owner'), async (req, res) => {
        const Posts = await postModel.find({})
        res.render("posts", { Posts })
    })

    app.get('/dashboard/posts/edit/:id', authenticationToken, authorizeRole('admin', 'owner'), async (req, res) => {
        const postId = req.params.id
        const post = await postModel.findOne({ _id: postId })
        res.render("edit-post", { post })
    })

    app.get('/dashboard/room', authenticationToken, authorizeRole('admin', 'owner'), async (req, res) => {
        const messages = await messageModel.find({})
        const username = req.user.username
        res.render("room", { messages, username })
    })



}