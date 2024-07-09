const date = require('date-and-time')
const filterDateFormat = 'DD-MM-YYYY'

function isFilterDateValid(query) {
    const args = query.split(' ')

    if (args.length !== 4) {
        return false
    }

    if (!(args[0] === 'from' && args[2] === 'to')) {
        return false
    }

    const fromDate = args[1]
    const toDate = args[3]

    return date.isValid(fromDate, filterDateFormat) && date.isValid(toDate, filterDateFormat)
}

module.exports = function (fastify, opts, done) {
    const Article = require('../../../models/Article.model')
    const { convertMultipartToJSON } = require('../../../utils/convert')

    fastify.get('/', async (req, reply) => {
        try {
            if (!(req.query.filterByDate && isFilterDateValid(req.query.filterByDate))) {
                const articles = await Article.find()
                if (!articles) { throw new Error('Failed to get all articles') }
                    
                reply.code(200).send(articles)
                return reply
            }
            
            const filterArgs = req.query.filterByDate.split(' ')
            const fromDate = date.parse(filterArgs[1], filterDateFormat)
            const toDate = date.parse(filterArgs[3], filterDateFormat)

            const articles = await Article.find({
                'createdAt': {
                    '$gte': fromDate,
                    '$lte': toDate
                }
            })
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