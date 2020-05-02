var sinon = require('sinon')
var chai = require('chai')
var expect = chai.expect

var mongoose = require('mongoose')

var Bid = require('../../Model/Bid')
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