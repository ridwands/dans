const AuthController = require('../Controllers/AuthController')
const JobsController = require('../Controllers/JobsController')
const AuthMiddleware = require('../Middleware/AuthMiddleware')

module.exports = (server, opts, next) => {
    server.route({
        url: "/v1/login",
        method: "POST",
        handler: AuthController.login,
        schema: {
            body: {
                type: "object",
                properties: {
                    username: {
                        type: "string"
                    },
                    password: {
                        type: "string"
                    }
                },
                required: ["username", "password"]
            }
        }
    })
    server.route({
        url: "/v1/auth/profile",
        method:"GET",
        preHandler: AuthMiddleware.jwt,
        handler:AuthController.profile
    })

    server.route({
        url: "/v1/jobs/list",
        method: "GET",
        preHandler: AuthMiddleware.jwt,
        handler: JobsController.jobsList,
        schema: {
            querystring: {
                type:"object",
                properties: {
                    limit : {
                        type:"integer"
                    },
                    page: {
                        type: "integer"
                    }
                },
                required: ["limit","page"]
            }
        }
    })

    server.route({
        url: "/v1/jobs/detail/:id",
        method:"GET",
        preHandler: AuthMiddleware.jwt,
        handler: JobsController.jobsDetail
    })
    next()
}