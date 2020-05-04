var app = require('../../index').app
var request = require('supertest')
var mongoose = require('mongoose')

// Testing with active database to register user
describe('POST /customers/Register', function(){
        const user = {
                _id: new mongoose.Types.ObjectId(),
                user_email: 'abc@gmail.com',
                user_pswd: 'abc',
                user_address: 'address',
                user_address2: 'address2',
                user_city: 'city',
                user_stateDetails: 'UP',
                user_mobile: '9876543210',
        }
        it('register user', function(done){
                request(app)
                .post('/customers/Register')
                .send(user)
                .set('Accept', '*/*')
                .expect('Content-Type', 'application/json; charset=utf-8')
                .expect(200)
                .end(function(err, res) {
                        if (err) return done(err);
                        done();
                })
        })
})