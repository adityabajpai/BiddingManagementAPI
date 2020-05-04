var app = require('../../index').app
var request = require('supertest')


describe('GET /products/Products', function() {
    it('get all products', function(done) {
        request(app)
        .get('/products/Products')
        .set('Accept', '*/*')
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(200)
        .end(function(err, res) {
            if (err) return done(err);
            done();
        });
    })
})