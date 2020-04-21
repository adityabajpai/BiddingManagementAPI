const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Bid = require('../Model/Bid');
const User = require('../Model/User');
const getBid = require('../Services/Bids/GetBid');

router.post('/Bid',(req, res)=>{
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
                bid_time: req.body.bid_time
            })
            bid.save()
            .then(result=>{
                console.log(result);
                res.status(200).json({
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
                })
            })
            .catch(err=>{
                console.log(err);
                res.json({
                    message: 'Bid upload failed',
                    err: err
                })
            })
        }
        else {
            console.log("User not registered");
        }
    })
    .catch(err=>{
        console.log("Error while finding User",err);
    })
})


router.get('/Bid/:productId', (req, res)=>{
    console.log("getBid");
    Bid.find({product_id: req.params.productId})
    .exec()
    .then(bids=>{
        res.status(200).json({
            message: 'Bid Posted Successfully',
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
        })
    })
    .catch(err=>{
        console.log(err);
        res.json({
            err: err
        })
    })
})

router.get('/maxBid/:productId', (req, res)=>{
    // console.log("getBid");
    Bid.find({product_id: req.params.productId})
    .sort('bid_price')
    .exec()
    .then(bids=>{
        res.status(200).json({
            message: 'Bid Posted Successfully',
            bids: bids.map(bid=>{
                return{
                    _id: bid._id,
                    bid_id: bid.bid_id,
                    tenderer_email: bid.tenderer_email,
                    bidder_email: bid.bidder_email,
                    bid_price: bid.bid_price,
                    previous_bid: bid.previous_bid,
                    bid_time: Date.now()
                }
            })
        })
    })
    .catch(err=>{
        console.log(err);
        res.json({
            err: err
        })
    })
})

//update bid

// const updateUser = {
//     user_totalBids: tempBids.toString()
// }
// User.updateOne({_id: id}, {$set: updateUser})
// .exec()
// .then(result=>{
//     console.log("totalBidsUpdated");  
// })
// .catch(err=>{
//     console.log("Error while updating totalBids",err);
// })

//delete bid

module.exports = router;