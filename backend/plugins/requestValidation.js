const fp = require('fastify-plugin')
const { validate: uuidValidate } = require('uuid')
const { version: uuidVersion } = require('uuid')
const { BadRequest } = require('http-errors')

module.exports = fp(function(fastify, opts, done) {
    fastify.addHook('preValidation', (req, reply, done) => {
        try {
            const userId = req.headers['x-user-id']
            const isValid = uuidValidate(userId) && uuidVersion(userId) === 7
    
            if (!isValid) {
                throw BadRequest("User is not valid")
            }
        } catch (error) {
            reply.code(error.statusCode || 500).send(error)
        }

        done()
    })

    done()
})