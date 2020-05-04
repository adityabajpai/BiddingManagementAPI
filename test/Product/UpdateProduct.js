var app = require('../../index').app
var request = require('supertest')

describe('PATCH /products/Product/:productId', function() {
    const product = {
        product_name: 'Fourth Product',
        product_bidding_price: '450',
        product_description: 'This is fourth product',
        product_bidding_EndDate: '9/9/2020',
    }
    it('update the product', function(done) {
        request(app)
        .patch('/products/Product/5eae33dc98c04534c06db368')
        .send(product)
        .set('Accept', '*/*')
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(200)
        .end(function(err, res) {
            if (err) return done(err)
            done()
        });
    })
})