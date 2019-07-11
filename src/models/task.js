const mongoose = require('mongoose')
const validator = require('validator')


const Tasks = mongoose.model('Tasks', {
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: Boolean,
        default: false
    }
})

module.exports = Tasks