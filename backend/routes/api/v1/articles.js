module.exports = function (fastify, opts, done) {
    const Article = require('../../../models/Article.model')
    const { convertMultipartToJSON } = require('../../../utils/convert')

    fastify.get('/', async (req, reply) => {
        try {
            const articles = await Article.find()
            if (!articles) throw new Error('Failed to get all articles')
            reply.code(200).send(articles)
        } catch (error) {
            reply.code(500).send(error)
        }
        
        return reply
    })
    
    fastify.get('/:id', async (req, reply) => {
        try {
            const id = req.params.id
            const article = await Article.findById(id)
            
            if (!article) throw new Error(`Failed to get article with id ${id}`)

            reply.code(200).send(article)
        } catch (error) {
            reply.code(500).send(error)
        }

        return reply
    })

    fastify.post('/', async (req, reply) => {
        const data = await convertMultipartToJSON(req.body)
        const newArticle = new Article(data)

        try {
            const article = await newArticle.save()
            if (!article) throw new Error('Failed to add the article')
            reply.code(200).send(article)
        } catch (error) {
            reply.code(500).send(error)
        }

        return reply
    })

    fastify.put('/:id', async (req, reply) => {
        try {
            const id = req.params.id
            const data = await convertMultipartToJSON(req.body)

            const article = await Article.findByIdAndUpdate(id, data, {
                returnDocument: 'after'
            })

            if (!article) throw new Error(`Failed to update the article with id ${id}`)

            reply.code(200).send(article)
        } catch (error) {
            reply.code(500).send(error)
        }

        return reply
    })

    fastify.delete('/:id', async (req, reply) => {
        try {
            const id = req.params.id
            const removedArticle = await Article.findByIdAndDelete(id)

            if (!removedArticle) throw new Error(`Failed to delete article with id ${id}`)

            reply.code(200).send(removedArticle)
        } catch (error) {
            reply.code(500).send(error)
        }

        return reply
    })

    done()
}