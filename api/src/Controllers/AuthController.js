const UsersRepo = require('../Repositories/UsersRepo')
const _ =require('lodash')
const bcrypt=require('bcrypt')

module.exports.login = async(req,res)=>{
    try{
        const getUsersByUsername=await UsersRepo.getUsersByUsername(req)
        if (_.isEmpty(getUsersByUsername)){
            return res.send({
                code: 400,
                message: "Username or Password Wrong",
                data: []
            })
        }

        const check = await bcrypt.compare(req.body.password, getUsersByUsername[0].password)
        if (!check) {
            return res.send({
                code: 400,
                message: "Username or Password Wrong",
                data: []
            })
        }
        const token = req.server.jwt.sign(getUsersByUsername)
        const data = {
            token: token,
            user: {
                id: getUsersByUsername[0].id,
                username: getUsersByUsername[0].username
            }
        }
        return res.send({
            code:200,
            message: "Login Successfully",
            data:data
        })
    }catch (err){
        throw err
    }
}

module.exports.profile = async(req,res)=>{
    return res.send(req.user)
}