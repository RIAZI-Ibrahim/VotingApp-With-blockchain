const mongoose = require('mongoose')

const ElectorTemplate = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    passcode: {
        type: Number,
        required: true,
        unique: true
    },
    idVote :{
        type : Number,
        required : true

    },
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    projectDescription: {
        type: String,
        required: true
    }

})


module.exports = mongoose.model('Candidates', ElectorTemplate)