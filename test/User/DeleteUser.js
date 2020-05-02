var sinon = require('sinon')
var chai = require('chai')
var expect = chai.expect

var mongoose = require('mongoose')

var User = require('../../Model/User')

// Test will pass if the todo is deleted based on an ID
describe("Delete a user by id", function(){
    it("should delete a user by id", function(done){
        var UserMock = sinon.mock(User);
        var expectedResult = { status: 200,
            message: 'User deleted'
        };
        UserMock.expects('remove').withArgs({_id: '5e8af4bb30e96b241094acd9'}).yields(null, expectedResult);
        User.remove({_id: '5e8af4bb30e96b241094acd9'}, function (err, result) {
            UserMock.verify();
            UserMock.restore();
            expect(result.status).to.equal(200);
            done();
        });
    });
    // Test will pass if the user is not deleted based on an ID
    it("should return error if delete action is failed", function(done){
        var UserMock = sinon.mock(User);
        var expectedResult = { status: 500,
            message: 'Something went wrong...' 
        };
        UserMock.expects('remove').withArgs({_id: '5e8af4bb30e96b241094acd9'}).yields(expectedResult, null);
        User.remove({_id: '5e8af4bb30e96b241094acd9'}, function (err, result) {
            UserMock.verify();
            UserMock.restore();
            expect(err.status).to.equal(500);
            done();
        });
    });
});