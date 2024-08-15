const ErrorHandler = (err, req, res, next) => {
    const errorStatus = err.statusCode || 500
    const errorMessage = err.message || 'Something went worng'
    res.status(errorStatus).json({
        message: errorMessage,
        status: errorStatus
    })
}

module.exports = {ErrorHandler}