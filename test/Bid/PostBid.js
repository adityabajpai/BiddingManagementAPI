var sinon = require('sinon')
var chai = require('chai')
var expect = chai.expect

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

 describe("Register a new Bid", function(){
        it("should create new bid", function(done){
                var new_Bid = new Bid({
                    _id: new mongoose.Types.ObjectId(),
                    tenderer_email: 'tenderer_email',
                    bidder_email: 'bidder_email',
                    bid_price: 'bid_price',
                    product_id: 'product_id',
                    bid_time: Date.now()
                })
                var BidMock = sinon.mock(new_Bid)
                var bid = BidMock.object
                var expectedResult = { 
                        status: 200,
                            message: 'Bid Register Successfully',
                            bid: {
                                _id: new_Bid._id,
                                tenderer_email: new_Bid.tenderer_email,
                                bidder_email: new_Bid.bidder_email,
                                bid_price: new_Bid.bid_price,
                                product_id: new_Bid.product_id,
                                bid_time: new_Bid.bid_time
                        }
                }
                BidMock.expects('save').yields(null, expectedResult);
                bid.save(function (err, result) {
                        BidMock.verify();
                        BidMock.restore();
                        expect(result.status).to.equal(200);
                        done();
                });
        });
        // Test will pass if the bid is not saved
        it("should return error, if post not saved", function(done){
                var new_Bid = new Bid({
                    _id: new mongoose.Types.ObjectId(),
                    tenderer_email: 'tenderer_email',
                    bidder_email: 'bidder_email',
                    bid_price: 'bid_price',
                    product_id: 'product_id',
                    bid_time: Date.now()
                })
                var BidMock = sinon.mock(new_Bid);
                var bid = BidMock.object;
                var expectedResult = { 
                        status: 500,
                        message: 'Something went wrong...'
                };
                BidMock.expects('save').yields(expectedResult, null);
                bid.save(function (err, result) {
                        BidMock.verify();
                        BidMock.restore();
                        expect(err.status).to.equal(500);
                        done();
                });
        });
});