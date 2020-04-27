const mongoose = require('mongoose');

const randomNumberSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    user_id: {
        type: String,
        require: true
    },
    randomNo: {
        type: String,
        require: true
    }
})

module.exports = mongoose.model('Random', randomNumberSchema);