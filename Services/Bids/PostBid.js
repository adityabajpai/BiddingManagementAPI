const mongoose = require('mongoose')
const Bid = require('../../Model/Bid');
const User = require('../../Model/User');

function postBid(req, res){
    return new Promise(function(resolve, reject){
        console.log("PostBid");
        User.find({user_email: req.body.bidder_email})
        .exec()
        .then(result=>{
            if(result.length>=1){
                console.log(result[0].user_totalBids);
                var tempBids = parseInt(result[0].user_totalBids) + 1;
                console.log(tempBids);
                const bid = new Bid({
                    _id: new mongoose.Types.ObjectId(),
                    tenderer_email: req.body.tenderer_email,
                    bidder_email: req.body.bidder_email,
                    bid_price: req.body.bid_price,
                    product_id: req.body.product_id,
                    bid_time: Date.now()
                })
                bid.save()
                .then(result=>{
                    console.log(result);
                    const message = {
                        status: 200,
                        message: 'Bid Posted Successfully',
                        bid: {
                            _id: result._id,
                            bid_id: result.bid_id,
                            tenderer_email: result.tenderer_email,
                            bidder_email: result.bidder_email,
                            bid_price: result.bid_price,
                            product_id: result.product_id,
                            bid_time: result.bid_time
                        }
                    }
                    // res.status(200).json({
                    //     message: 'Bid Posted Successfully',
                    //     bid: {
                    //         _id: result._id,
                    //         bid_id: result.bid_id,
                    //         tenderer_email: result.tenderer_email,
                    //         bidder_email: result.bidder_email,
                    //         bid_price: result.bid_price,
                    //         product_id: result.product_id,
                    //         bid_time: result.bid_time
                    //     }
                    // })
                    resolve(message);
                })
                .catch(err=>{
                    // console.log(err);
                    const error = {
                        status: 500,
                        message: 'Bid Upload Failed',
                        err: err
                    }
                    // res.json({
                    //     message: 'Bid upload failed',
                    //     err: err
                    // })
                    reject(error)
                })
            }
            else {
                console.log("User not registered");
                const error = {
                    status: 404,
                    message: 'User not registered',
                    err: err
                }
                reject(error)
            }
        })
        .catch(err=>{
            console.log("Error while finding User");
            const error = {
                status: 500,
                message: 'Internal Server Error',
                err: err
            }
            reject(error)
        })
    })
}

module.exports = postBid;