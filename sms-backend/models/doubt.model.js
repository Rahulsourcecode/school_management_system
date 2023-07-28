const mongoose = require('mongoose')

const doubtSchema = mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
})

const Doubts = mongoose.model('doubt', doubtSchema)

module.exports = { Doubts } 