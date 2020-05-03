var app = require('../../index').app
var request = require('supertest')

describe('PATCH /customers/User/:userId', function() {
    it('update User', function(done) {
        const updateUser = {
            user_address: 'B-238',
            user_address2: 'Awas Vikas Colony',
            user_city: "Sitapur",
            user_stateDetails: 'UP',
            user_mobile: '9876543210',
        }
        request(app)
        .patch('/customers/User/5ea87e2a2a4c4a286033844b')
        .send(updateUser)
        .set('Accept', '*/*')
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(200)
        .end(function(err, res) {
            if (err) return done(err);
            done();
        });
    })
})