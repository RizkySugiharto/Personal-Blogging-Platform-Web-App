const mongoose = require('mongoose')
const mongooseDateFormat = require('mongoose-date-format')

const ArticleSchema = new mongoose.Schema({
    thumbnail: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

ArticleSchema.plugin(mongooseDateFormat)
const Article = mongoose.model('Article', ArticleSchema)

module.exports = Article