const fp = require('fastify-plugin')

module.exports = fp(function(fastify, opts, done) {
    fastify.addHook('preValidation', async (req, reply) => {
        try {
            const apiKey = req.headers['x-api-key']
    
            if (apiKey !== process.env.API_KEY) {
                throw new Error("Missing api key")
            }
        } catch (error) {
            reply.code(401).send(error)
        }
    })

    done()
})