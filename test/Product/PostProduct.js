var sinon = require('sinon')
var chai = require('chai')
var expect = chai.expect
var mongoose = require('mongoose')
var Product = require('../../Model/Product')
var app = require('../../index').app
var request = require('supertest')

// describe('POST /products/Product', function() {
//         const product = new Product({
//                 _id: new mongoose.Types.ObjectId(),
//                 product_id: '1',
//                 product_name: 'First Product',
//                 product_img: 'parentDirectory',
//                 product_bidding_price: '100',
//                 product_description: 'This is the first product',
//                 product_uploadDate: Date.now(),
//                 product_bidding_EndDate: '6/6/2020',
//                 product_userId: '5e8af4bb30e96b241094acd9',
//                 product_userEmail: 'adityabajpai444@gmail.com'
//         })
//         it('post product', function(done) {
//                 request(app)
//                 .post('/products/Product')
//                 .send(product)
//                 .set('Accept', '*/*')
//                 .expect('Content-Type', 'application/json; charset=utf-8')
//                 .expect(200)
//                 .end(function(err, res) {
//                         if (err) return done(err);
//                         done();
//                 });
//         })
// })

 describe("Register a new Product", function(){
        it("should create new product", function(done){
                var new_Product = new Product({
                    _id: new mongoose.Types.ObjectId(),
                    product_id: '1',
                    product_name: 'product_name',
                    product_img: 'parentDirectory',
                    product_bidding_price: 'product_bidding_price',
                    product_description: 'product_description',
                    product_uploadDate: Date.now(),
                    product_bidding_EndDate: 'product_bidding_EndDate',
                    product_userId: 'product_userId',
                    product_userEmail: 'product_userEmail'
                })
                var ProductMock = sinon.mock(new_Product)
                var product = ProductMock.object
                var expectedResult = { 
                        status: 200,
                            message: 'Product Register Successfully',
                            product: {
                                _id: new_Product._id,
                                product_id: new_Product.product_id,
                                product_name: new_Product.product_name,
                                product_img: new_Product.product_img,
                                product_bidding_price: new_Product.product_bidding_price,
                                product_description: new_Product.product_description,
                                product_uploadDate: new_Product.product_uploadDate,
                                product_bidding_EndDate: new_Product.product_bidding_EndDate,
                                product_userId: new_Product.product_userId,
                                product_userEmail: new_Product.product_userEmail
                        }
                }
                ProductMock.expects('save').yields(null, expectedResult);
                product.save(function (err, result) {
                        ProductMock.verify();
                        ProductMock.restore();
                        expect(result.status).to.equal(200);
                        done();
                });
        });
        // Test will pass if the product is not saved
        it("should return error, if post not saved", function(done){
                var new_Product = new Product({
                        _id: new mongoose.Types.ObjectId(),
                        product_email: 'abc@gmail.com',
                        product_pswd: 'abc',
                        product_address: 'address',
                        product_address2: 'address2',
                        product_city: 'city',
                        product_stateDetails: 'stateDetails',
                        product_mobile: 'mobile',
                        product_totalBids: '0',
                        product_totalBidWins: '0'
                })
                var ProductMock = sinon.mock(new_Product);
                var product = ProductMock.object;
                var expectedResult = { 
                        status: 500,
                        message: 'Something went wrong...'
                };
                ProductMock.expects('save').yields(expectedResult, null);
                product.save(function (err, result) {
                        ProductMock.verify();
                        ProductMock.restore();
                        expect(err.status).to.equal(500);
                        done();
                });
        });
});