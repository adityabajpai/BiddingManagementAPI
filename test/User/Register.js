var sinon = require('sinon')
var chai = require('chai')
var expect = chai.expect
var app = require('../../index').app
var request = require('supertest')

var mongoose = require('mongoose')

var User = require('../../Model/User')

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

// Mongoose Model Testing
 describe("Register a new User", function(){
        it("should create new user", function(done){
                var UserMock = sinon.mock(new User({
                        _id: new mongoose.Types.ObjectId(),
                        user_email: 'abc@gmail.com',
                        user_pswd: 'abc',
                        user_address: 'address',
                        user_address2: 'address2',
                        user_city: 'city',
                        user_stateDetails: 'stateDetails',
                        user_mobile: 'mobile',
                        user_totalBids: '0',
                        user_totalBidWins: '0'
                }))
                var user = UserMock.object
                var expectedResult = { 
                        status: 200,
                        message: 'User Register Successfully',
                }
                UserMock.expects('save').yields(null, expectedResult);
                user.save(function (err, result) {
                        UserMock.verify();
                        UserMock.restore();
                        expect(result.status).to.equal(200);
                        done();
                });
        });
        // Test will pass if the user is not saved
        it("should return error, if post not saved", function(done){
                var UserMock = sinon.mock(new User({
                        _id: new mongoose.Types.ObjectId(),
                        user_email: 'abc@gmail.com',
                        user_pswd: 'abc',
                        user_address: 'address',
                        user_address2: 'address2',
                        user_city: 'city',
                        user_stateDetails: 'stateDetails',
                        user_mobile: 'mobile',
                        user_totalBids: '0',
                        user_totalBidWins: '0'
                }));
                var user = UserMock.object;
                var expectedResult = { 
                        status: 500,
                        message: 'Something went wrong...'
                };
                UserMock.expects('save').yields(expectedResult, null);
                user.save(function (err, result) {
                        UserMock.verify();
                        UserMock.restore();
                        expect(err.status).to.equal(500);
                        done();
                });
        });
});