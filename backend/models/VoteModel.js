const mongoose = require('mongoose')

const VoteTemplate = new mongoose.Schema({
    id:{
        type: Number,
        required:true,
        unique : true
    },
    dateD:{
        type:Date,
        required:true,
        default : Date.now
    },
    DateF:{
        type:Date,
        default:Date.now,
        required : true
    }

})


module.exports = mongoose.model('Vote',VoteTemplate)