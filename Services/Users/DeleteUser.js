const User = require('../../Model/User');

function deleteUser(req){
    return new Promise(function(resolve, reject){
        const id = req.params.userId;
        User.deleteOne({_id: id})
        .exec()
        .then(result=>{
            const msg = {
                status: 200,
                message: "User Deleted"
            }
            resolve(msg)
            // res.status(200).json({
            //     message: 'User deleted',
            //     response: result
            // })
        })
        .catch((err)=>{
            const msg = {
                status: 500,
                message: err
            }
            reject(msg);
            // res.status(500).json({
            //     error: err
            // })
        })
    })
}

module.exports = deleteUser;