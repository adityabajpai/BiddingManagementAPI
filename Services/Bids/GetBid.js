const Bid = require('../../Model/Bid');

function getBid(){
    // Bid.find({product_id: req.params.productId})
    // .exec()
    // .then(bids=>{
    //     res.status(200).json({
    //         message: 'Bid Posted Successfully',
    //         bids: bids.map(bid=>{
    //             return{
    //                 _id: new mongoose.Types.ObjectId(),
    //                 bid_id: bid.bid_id,
    //                 tenderer_email: bid.tenderer_email,
    //                 bidder_email: bid.bidder_email,
    //                 bid_price: bid.bid_price,
    //                 product_id: bid.product_id,
    //                 bid_time: bid.bid_time
    //             }
    //         })
    //     })
    // })
    // .catch(err=>{
    //     console.log(err);
    //     res.json({
    //         err: err
    //     })
    // })
    return "getBid";
}

module.exports = getBid();