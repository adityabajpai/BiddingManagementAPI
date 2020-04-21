const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    product_id: {
        type: String,
        require: true
    },
    product_name: {
        type: String,
        require: true
    },
    product_img: {
        type: String,
        require: true
    },
    product_bidding_price: {
        type: String,
        require: true
    },
    product_description: {
        type: String,
        require: true
    },
    product_uploadDate: {
        type: String,
        require: true
    },
    product_bidding_EndDate: {
        type: String,
        require: true
    },
    product_userId: {
        type: String,
        require: true
    },
    product_userEmail: {
        type: String,
        require: true
    }
})

module.exports = mongoose.model('Product', productSchema);