const mongoose = require('mongoose');
const Random = require('../../Model/RandomNumber')

function randomNumber(userId, randNo){
    console.log("function RandomNumber");
    console.log("userid", userId);
    console.log("randNo", randNo);
    return new Promise(function(resolve, reject){
        console.log("inside Promise");
        const random = new Random({
            _id: new mongoose.Types.ObjectId(),
            user_id: userId,
            randomNo: randNo
        })
        console.log("randNumber",random);
        random.save()
        .then(result=>{
            const msg = {
                status: 200,
                msg: 'Verification Code Generated Successfully',
                res: result
            }
            resolve(msg)
        })
        .catch(err=>{
            const error = {
                status: 500,
                message: 'Internal Server Error',
                err: err
            }
            reject(error)
        })
    })
}

module.exports = randomNumber;