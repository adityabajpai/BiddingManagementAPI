var app = require('../../index').app
var request = require('supertest')

describe('POST /customers/Login', function() {
    it('responds with JSON', function(done) {
        request(app)
        .post('/customers/Login')
        .send({user_email: 'adityabajpai0303@gmail.com', user_pswd: 'adityabajpai0303'})
        .set('Accept', '*/*')
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(200)
        .end(function(err, res) {
            if (err) return done(err);
            done();
        });
    })
})