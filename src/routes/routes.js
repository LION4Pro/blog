const express = require("express")
const router = express()
const authController = require("../controllers/authController")
const postController = require("../controllers/postController")
const adminController = require("../controllers/adminController")
const upload = require("../controllers/postController")

router.post("/register", authController.register)
router.post("/login", authController.login)
router.post("/dashboard/addPost",upload.upload.single("image"), postController.addPost)
router.post("/dashboard/post/delete/:id",adminController.deletePost)
router.post("/admin/register",adminController.adminRegister)
router.post("/admin/login",adminController.adminLogin)
router.post("/dashboard/posts/edit/id=:id",adminController.adminLogin)

module.exports = router

