const multer = require("multer")
const postModel = require("../models/postModel")
const path = require("path")


const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, './src/images')
	},
	filename: (req, file, cb) => {
		cb(null, Date.now() + file.fieldname + path.extname(file.originalname))
	}
})



const upload = multer({ storage })

const addPost = async (req, res, next) => {
	const {author, title, text} = req.body
	console.log(req.user)
	const image = req.file ? req.file.filename : null
	try {

		const newPost = new postModel({
			author,
			image,
			title,
			text,
			lastPosted: Date.now()
		})

		await newPost.save()
		res.redirect("/")

	} catch (error) {
		next(error)
	}

}

module.exports = { addPost, upload }
