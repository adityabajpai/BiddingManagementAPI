const mongoose = require('mongoose');

const bidSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    tenderer_email: {
        type: String,
        require: true
    },
    bidder_email: {
        type: String,
        require: true
    },
    bid_price: {
        type: Number,
        require: true
    },
    product_id: {
        type: String,
        require: true
    },
    bid_time: {
        type: String,
        require: true
    }
})

module.exports = mongoose.model('Bid', bidSchema);