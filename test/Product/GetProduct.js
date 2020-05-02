var sinon = require('sinon')
var chai = require('chai')
var expect = chai.expect

var mongoose = require('mongoose')

var Product = require('../../Model/Product')
describe("Get all products", function(){
    // Test will pass if we get all products
   it("should return all products", function(done){
       var ProductMock = sinon.mock(Product);
       var expectedResult = {status: 200, product: []};
       ProductMock.expects('find').yields(null, expectedResult);
       Product.find(function (err, result) {
           ProductMock.verify();
           ProductMock.restore();
           expect(result.status).to.equal(200);
           done();
       });
   });

   // Test will pass if we fail to get a product
   it("should return error", function(done){
       var ProductMock = sinon.mock(Product);
       var expectedResult = {status: 500, error: "Something went wrong"};
       ProductMock.expects('find').yields(expectedResult, null);
       Product.find(function (err, result) {
           ProductMock.verify();
           ProductMock.restore();
           expect(err.status).to.equal(500);
           done();
       });
   });
});