var mongoose = require('mongoose')
var Bid = require('../../Model/Bid')
var app = require('../../index').app
var request = require('supertest')


describe('POST /bids/Bid', function() {
    it('post the new bid', function(done) {
        const bid = new Bid({
                _id: new mongoose.Types.ObjectId(),
                tenderer_email: 'adityabajpai0303@gmail.com',
                bidder_email: 'adityabajpai444@gmail.com',
                bid_price: '1500',
                product_id: '5e9373e2301faf2408a471eb',
                bid_time: Date.now()
        })
        request(app)
        .post('/bids/Bid')
        .send(bid)
        .set('Accept', '*/*')
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(200)
        .end(function(err, res) {
            if (err) return done(err);
            done();
        });
    })
})