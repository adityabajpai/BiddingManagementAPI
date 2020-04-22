const express = require('express');
const router = express.Router();
const getBid = require('../Services/Bids/GetBid');
const maxBid = require('../Services/Bids/MaxBid');
const postBid = require('../Services/Bids/PostBid');

router.post('/Bid',(req, res)=>{
    var result = postBid(req, res);
    result
    .then(bid=>{
        res.send(bid)
    })
    .catch(err=>{
        res.send(err)
    })
})

router.get('/Bids/:productId', (req, res)=>{
    var result = getBid(req, res);
    result
    .then(bids=>{
        res.send(bids)
    })
    .catch(err=>{
        res.send(err)
    })
})

router.get('/Bid/:productId', (req, res)=>{
    // console.log("getBid");
    var result = maxBid(req, res);
    result
    .then(bid=>{
        res.send(bid);
    })
    .catch(err=>{
        res.send(err)
    })
})

module.exports = router;