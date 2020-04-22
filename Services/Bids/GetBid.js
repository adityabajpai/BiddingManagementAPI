const mongoose = require('mongoose');
const Bid = require('../../Model/Bid');

function getBid(req, res){
    return new Promise(function(resolve, reject){
        Bid.find({product_id: req.params.productId})
        .exec()
        .then(bids=>{
            const result = {
                status: 200,
                message: 'Bid Fetched Successfully',
                bids: bids.map(bid=>{
                    return{
                        _id: new mongoose.Types.ObjectId(),
                        bid_id: bid.bid_id,
                        tenderer_email: bid.tenderer_email,
                        bidder_email: bid.bidder_email,
                        bid_price: bid.bid_price,
                        product_id: bid.product_id,
                        bid_time: bid.bid_time
                    }
                })
            }
            resolve(result);
        })
        .catch(err=>{
            const error = {
                status: 500,
                err: err
            }
            reject(error)
        })
    })
}

module.exports = getBid;