var sinon = require('sinon')
var chai = require('chai')
var expect = chai.expect
var app = require('../../index').app
var request = require('supertest')

var Bid = require('../../Model/Bid')

describe('GET /bids/Bids/5e9373e2301faf2408a471eb', function() {
    it('get all bids of a particular product_ID', function(done) {
        request(app)
        .get('/bids/Bids/5e9373e2301faf2408a471eb')
        .set('Accept', '*/*')
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(200)
        .end(function(err, res) {
            if (err) return done(err);
            done();
        });
    })
})

describe("Get all bids", function(){
    // Test will pass if we get all bids
   it("should return all bids", function(done){
       var BidMock = sinon.mock(Bid);
       var expectedResult = {status: 200, bid: []};
       BidMock.expects('find').yields(null, expectedResult);
       Bid.find(function (err, result) {
           BidMock.verify();
           BidMock.restore();
           expect(result.status).to.equal(200);
           done();
       });
   });

   // Test will pass if we fail to get a bid
   it("should return error", function(done){
       var BidMock = sinon.mock(Bid);
       var expectedResult = {status: 500, error: "Something went wrong"};
       BidMock.expects('find').yields(expectedResult, null);
       Bid.find(function (err, result) {
           BidMock.verify();
           BidMock.restore();
           expect(err.status).to.equal(500);
           done();
       });
   });
});