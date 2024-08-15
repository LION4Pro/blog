const jwt = require("jsonwebtoken")

const authenticationToken = (req, res, next) => {
    const token = req.cookies.token
    if (!token) {
        console.log('not found')
    }

    try {

        const verify = jwt.verify(token, process.env.APP_SECRET)
        req.user = verify
        next()

    } catch (error) {
        return res.status(404).redirect("404")
    }
}

const authorizeRole = (...allowdRoles) => {
    return (req, res, next) => {
        const role = req.user.role
        if (allowdRoles.includes(role)) {

            next()
        }else {

            res.redirect("/dashboard")
        }
    }
}

module.exports = { authenticationToken, authorizeRole }