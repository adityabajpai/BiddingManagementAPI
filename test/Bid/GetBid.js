var app = require('../../index').app
var request = require('supertest')

describe('GET /bids/Bids/:id', function() {
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
