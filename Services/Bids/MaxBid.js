const Bid = require('../../Model/Bid');

function maxBid(req, res){
    return new Promise(function(resolve, reject){
        console.log("maxBid");
        Bid.find({product_id: req.params.productId})
        .sort('bid_price')
        .exec()
        .then(bids=>{
            var bidList =  bids.map(bid=>{
                return{
                    _id: bid._id,
                    bid_id: bid.bid_id,
                    tenderer_email: bid.tenderer_email,
                    bidder_email: bid.bidder_email,
                    bid_price: bid.bid_price,
                    previous_bid: bid.previous_bid,
                }
            })
            const msg = {
                status: 200,
                message: 'Max Bid',
                bid: bidList[bids.length-1]
            }
            resolve(msg);
        })
        .catch(err=>{
            const error = {
                status: 500,
                err: err
            }
            reject(error);
        })
    })
}

module.exports = maxBid;