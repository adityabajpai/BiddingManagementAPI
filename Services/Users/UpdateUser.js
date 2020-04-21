const User = require('../../Model/User');

function updateUser(req) {
    return new Promise(function(resolve, reject){
        console.log("userid",req.params.userId);
        console.log("Patch");
        const id = req.params.userId;
        const updateUser = {
            user_email: req.body.user_email,
            user_address: req.body.user_address,
            user_address2: req.body.user_address2,
            user_city: req.body.user_city,
            user_stateDetails: req.body.user_stateDetails,
            user_mobile: req.body.user_mobile,
            user_type: req.body.user_type
        }
        User.updateOne({_id: id}, {$set: updateUser})
        .exec()
        .then(result=>{
            const msg = {
                status: 200,
                message: 'User updated',
                updateUser: result
            }
            console.log(msg);
            resolve(msg)
        })
        .catch(err=>{
            const msg = {
                status: 500,
                message: err
            }
            reject(msg)
        })
    })
}

module.exports = updateUser;