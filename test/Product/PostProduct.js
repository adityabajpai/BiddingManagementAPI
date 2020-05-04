// var mongoose = require('mongoose')
// var Product = require('../../Model/Product')
// var app = require('../../index').app
// var request = require('supertest')

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