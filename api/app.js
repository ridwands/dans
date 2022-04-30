require('dotenv').config()
const server = require('fastify')({
    logger:true
})
const fastifyCors = require('@fastify/cors')
const fastifyPostgre = require('@fastify/postgres')
const fastifyJwt = require('@fastify/jwt')
const fastifyJwtSecret = {
    secret: process.env.JWT_SECRET
}

const corsConfig = {
    origin: "*",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
}
const postgreConnection = {
    connectionString: `${process.env.DB_CONNECTION}://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`
}

const routes = require("./src/Routes")

server
    .register(fastifyJwt,fastifyJwtSecret)
    .register(fastifyCors,corsConfig)
    .register(fastifyPostgre,postgreConnection)
    .register(routes)

server.decorateRequest('fastify', {getter: () => server});

const start = async () => {
    try {
        await server.listen(process.env.APP_PORT)
    } catch (err) {
        server.log.error(err)
        process.exit(1)
    }
}

start()

process.on('SIGINT', () => {
    server.close()
    process.exit()
})

process.on('unhandledRejection', err => {
    server.close()
    console.error(new Date() + ' unhandledRejection: ', err.message)
    console.error(err.stack)
    process.abort()
})

process.on('uncaughtException', err => {
    server.close()
    console.error(new Date() + ' uncaughtException: ', err.message)
    console.error(err.stack)
    process.abort()
})