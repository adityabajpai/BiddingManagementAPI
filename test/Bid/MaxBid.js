var app = require('../../index').app
var request = require('supertest')

describe('GET /bids/Bid/:productId', function() {
    it('maximum bid price for a particular product', function(done) {
        request(app)
        .get('/bids/Bid/5e9373e2301faf2408a471eb')
        .set('Accept', '*/*')
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(200)
        .end(function(err, res) {
            if (err) return done(err);
            done();
        });
    })
})