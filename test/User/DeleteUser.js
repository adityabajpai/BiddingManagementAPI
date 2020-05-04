var app = require('../../index').app
var request = require('supertest')

// Testcase to delete user with existing ID and ID must be updated in the URL before testing API
describe('DELETE /customers/User/:Id', ()=>{
    it('delete user by giving id', (done)=>{
        request(app)
            .delete('/customers/User/5eae18e6b2574306bc2686a0')
            .set('Accept', '*/*')
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                done();
        })
    })
})