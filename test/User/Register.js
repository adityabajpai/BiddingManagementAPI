var sinon = require('sinon')
var chai = require('chai')
var expect = chai.expect

var mongoose = require('mongoose')

var User = require('../../Model/User')

 describe("Register a new User", function(){
        it("should create new user", function(done){
                var new_User = new User({
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
                })
                var UserMock = sinon.mock(new_User)
                var user = UserMock.object
                var expectedResult = { 
                        status: 200,
                            message: 'User Register Successfully',
                            user: {
                                _id: new_User._id,
                                user_id: new_User.user_id,
                                user_email: new_User.user_email,
                                user_pswd: new_User.user_pswd,
                                user_address: new_User.user_address,
                                user_address2: new_User.user_address2,
                                user_city: new_User.user_city,
                                user_stateDetails: new_User.user_stateDetails,
                                user_mobile: new_User.user_mobile,
                                user_totalBids: new_User.user_totalBids,
                                user_totalBidWins: new_User.user_totalBidWins
                        }
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
                var new_User = new User({
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
                })
                var UserMock = sinon.mock(new_User);
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