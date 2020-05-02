var sinon = require('sinon')
var chai = require('chai')
var expect = chai.expect

var mongoose = require('mongoose')

var RandomNumber = require('../../Model/RandomNumber')

 describe("Register a new RandomNumber", function(){
        it("should create new randNumber", function(done){
                var new_RandomNumber = new RandomNumber({
                    _id: new mongoose.Types.ObjectId(),
                    user_id: 'userId',
                    randomNo: 'randNo'
                })
                var RandomNumberMock = sinon.mock(new_RandomNumber)
                var randNumber = RandomNumberMock.object
                var expectedResult = { 
                        status: 200,
                            message: 'RandomNumber Register Successfully',
                            randNumber: {
                                _id: new_RandomNumber._id,
                                user_id: new_RandomNumber.user_id,
                                randomNo: new_RandomNumber.randomNo
                        }
                }
                RandomNumberMock.expects('save').yields(null, expectedResult);
                randNumber.save(function (err, result) {
                        RandomNumberMock.verify();
                        RandomNumberMock.restore();
                        expect(result.status).to.equal(200);
                        done();
                });
        });
        // Test will pass if the randNumber is not saved
        it("should return error, if post not saved", function(done){
                var new_RandomNumber = new RandomNumber({
                    _id: new mongoose.Types.ObjectId(),
                    user_id: 'userId',
                    randomNo: 'randNo'
                })
                var RandomNumberMock = sinon.mock(new_RandomNumber);
                var randNumber = RandomNumberMock.object;
                var expectedResult = { 
                        status: 500,
                        message: 'Something went wrong...'
                };
                RandomNumberMock.expects('save').yields(expectedResult, null);
                randNumber.save(function (err, result) {
                        RandomNumberMock.verify();
                        RandomNumberMock.restore();
                        expect(err.status).to.equal(500);
                        done();
                });
        });
});