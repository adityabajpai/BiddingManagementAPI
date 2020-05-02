// var sinon = require('sinon')
// var chai = require('chai')
// var expect = chai.expect

// var mongoose = require('mongoose')

// var Product = require('../../Model/Product')

// describe("Update a new product by id", function(){
//     it("should updated a product by id", function(done){
//         var ProductMock = sinon.mock(new Product({_id: new mongoose.Types.ObjectId(),
//             product_name: 'name',
//             product_bidding_price: 'product_bidding_price',
//             product_description: 'product_description',
//             product_bidding_EndDate: 'product_bidding_EndDate',
//             product_userId: 'product_userId',
//             product_userEmail: 'abc@gmail.com'
//         }));
//         var product = ProductMock.object;
//         var expectedResult = { status: 200 };
//         ProductMock.expects('updateOne').withArgs({_id: '5e8af4bb30e96b241094acd9'}).yields(null, expectedResult);
//         product.updateOne(function (err, result) {
//             ProductMock.verify();
//             ProductMock.restore();
//             expect(result.status).to.equal(200);
//             done();
//         });
//     });
//     // Test will pass if the product is not updated based on an ID
//     it("should return error if update action is failed", function(done){
//         var ProductMock = sinon.mock(new Product({_id: new mongoose.Types.ObjectId(),
//             product_name: 'name',
//             product_bidding_price: 'product_bidding_price',
//             product_description: 'product_description',
//             product_bidding_EndDate: 'product_bidding_EndDate',
//             product_userId: 'product_userId',
//             product_userEmail: 'abc@gmail.com'
//         }));
//         var product = ProductMock.object;
//         var expectedResult = { status: 500 };
//         ProductMock.expects('updateOne').withArgs({_id: '5e8af4bb30e96b241094acd9'}).yields(expectedResult, null);
//         product.updateOne(function (err, result) {
//             ProductMock.verify();
//             ProductMock.restore();
//             expect(err.status).to.equal(500);
//             done();
//         });
//     });
// });