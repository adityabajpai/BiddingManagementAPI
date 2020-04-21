const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    user_id: {
        type: String,
        require: true
    },
    user_email: {
        type: String,
        require: true
    },
    user_pswd: {
        type: String,
        require: true
    },
    user_address: {
        type: String,
        require: true
    },
    user_address2: {
        type: String,
        require: true
    },
    user_city: {
        type: String,
        require: true
    },
    user_stateDetails: {
        type: String,
        require: true
    },
    user_mobile: {
        type: String,
        require: true
    },
    user_totalBids: {
        type: String,
        require: true
    },
    user_totalBidWins: {
        type: String,
        require: true
    },
    user_type: {
        type: String,
        require: true
    }
})

module.exports = mongoose.model('User', userSchema);