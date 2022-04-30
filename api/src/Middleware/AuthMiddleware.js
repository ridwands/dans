module.exports.jwt = async (req, res, next) => {
    try {
        await req.jwtVerify()
    } catch (err) {
        return res.code(401)
            .send({
                code: 401,
                message: err.message,
                data: []
            })
    }
}