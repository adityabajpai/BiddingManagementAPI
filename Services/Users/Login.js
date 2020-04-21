const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');
const User = require('../../Model/User');

function login(req){
    return new Promise(function(resolve, reject){
        User.findOne({user_email: req.body.user_email})
        .exec()
        .then(user=>{
            if(user.length<1){
                console.log('user not found');
                const msg = {
                    status: 404,
                    message: 'user not found'
                }
                reject(msg)
            }
            else{
                bcrypt.compare(req.body.user_pswd, user.user_pswd, (err, result)=>{
                    if(err){
                        // mail id exist but some error occurred
                        console.log('incorrect password');
                        const msg = {
                            status: 403,
                            message: 'incorrect password'
                        }
                        reject(msg)
                    }
                    else{
                        console.log("result",result);
                        if(result){
                            const token = jsonwebtoken.sign({
                                user_email: user.user_email,
                                _id: user._id
                            }, "secret",
                            {
                                expiresIn: "1h"
                            })
                            const res = {
                                status: 200,
                                message: 'Auth successful',
                                token: token,
                                type: user.user_type
                            }
                            resolve(res)
                            // return res.status(200).json({
                            //     message: 'Auth successful',
                            //     token: token,
                            //     type: user.user_type
                            // })
                        }
                        const msg = {
                            status: 401,
                            message: 'Auth failed'
                        }
                        reject(msg)
                    }
                })
            }
        })
        .catch(err=>{
            reject(err)
        })
    })
}

module.exports = login;