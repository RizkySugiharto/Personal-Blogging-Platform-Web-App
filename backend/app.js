// Load environment configurations
const minimist = require('minimist')
const toBoolean = require('to-boolean')
const config = require('./config')

const isLocalMode = toBoolean(minimist(process.argv.slice(2))['local'])
config.loadConfig(isLocalMode)

// Initliaze the app
const date = require('date-and-time')
const LOG_FILENAME = `${date.format(new Date(), 'DD-MM-YYYY')}.log`
const LOG_DIR = 'logs'

const fastify = require('fastify')({
    logger: {
        transport: {
            targets: process.env.NODE_ENV === 'development' ? [
                {
                    target: "@fastify/one-line-logger",
                    level: "debug",
                    options: {
                        destination: `./${LOG_DIR}/${LOG_FILENAME}`,
                        colorize: false,
                        append: false
                    }
                },
                { target: "@fastify/one-line-logger", level: "debug", }
            ] : [
                { target: "@fastify/one-line-logger" }
            ]
        }
    }
})

// Connect to Mongo DB
const mongoose = require('mongoose')
mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => fastify.log.info('Mongoose: Connected'))
    .catch((err) => fastify.log.error(`Mongoose: ${err}`))

// Register other plugins
fastify.register(require('./plugins/requestValidation'))
fastify.register(require('@fastify/rate-limit'), {
    keyGenerator: (req) => req.headers['x-user-id'],
    max: process.env.MAX_RATELIMIT_PER_MINUTE || 100,
    timeWindow: 60_000,
    hook: 'preHandler',
    cache: 3_000
})
fastify.register(require('./plugins/apiKey'))
fastify.register(require('@fastify/cors'), {
    origin: process.env.ALLOWED_ORIGINS
})
fastify.register(require('@fastify/multipart'),{
    attachFieldsToBody: true
})
fastify.register(require('@fastify/compress'))

// Register all routes
fastify.register(require('./routes/api/v1/articles'), { prefix: '/v1/articles' })

// Add default ('hello world') route
fastify.get('/', async (req, reply) => {
    return "Hello, World"
})

// Listen the app
fastify.listen({ port: process.env.PORT, host: '0.0.0.0' }, (err, address) => {
    if (err) {
        fastify.log.error(err)
        process.exit(1)
    }
    fastify.log.info(`Server listening on: ${address}`)
})

