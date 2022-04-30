module.exports.getUsersByUsername = async (req) => {
    const pg = req.server.pg
    const {rows} = await pg.query(
        `SELECT username, password,id
         FROM users
         WHERE username = $1`, [
            req.body.username
        ]
    )
    return rows
}