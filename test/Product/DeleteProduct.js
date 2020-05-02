var sinon = require('sinon')
var chai = require('chai')
var expect = chai.expect

var mongoose = require('mongoose')

var Product = require('../../Model/Product')

// Test will pass if the todo is deleted based on an ID
describe("Delete a product by id", function(){
    it("should delete a product by id", function(done){
        var ProductMock = sinon.mock(Product);
        var expectedResult = { status: 200,
            message: 'Product deleted'
        };
        ProductMock.expects('remove').withArgs({_id: '5e8af4bb30e96b241094acd9'}).yields(null, expectedResult);
        Product.remove({_id: '5e8af4bb30e96b241094acd9'}, function (err, result) {
            ProductMock.verify();
            ProductMock.restore();
            expect(result.status).to.equal(200);
            done();
        });
    });
    // Test will pass if the product is not deleted based on an ID
    it("should return error if delete action is failed", function(done){
        var ProductMock = sinon.mock(Product);
        var expectedResult = { status: 500,
            message: 'Something went wrong...' 
        };
        ProductMock.expects('remove').withArgs({_id: '5e8af4bb30e96b241094acd9'}).yields(expectedResult, null);
        Product.remove({_id: '5e8af4bb30e96b241094acd9'}, function (err, result) {
            ProductMock.verify();
            ProductMock.restore();
            expect(err.status).to.equal(500);
            done();
        });
    });
});