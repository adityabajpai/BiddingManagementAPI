const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const User = require('../../Model/User');

function register(req){
    return new Promise(function(resolve, reject){
        console.log("user_email",req.body.user_email);
        User.find({user_email: req.body.user_email})
        .exec()
        .then(user=>{
            console.log("user",user);
            console.log("length",user.length);
            if(user.length>=1){
                console.log("email already registered");
                const msg = {
                    status: 209,
                    message: 'Email already registered'
                }
                reject(msg);
            }
            else{
                console.log("new mail id");
                User.find()
                .exec()
                .then(totalUser=>{
                    console.log("user", totalUser);
                    bcrypt.hash(req.body.user_pswd,10,(err,hash)=>{
                        if(err){
                            console.log("error during encryption");
                            const msg = {
                                status: 500,
                                message: 'error during encryption'
                            }
                            reject(msg);
                        }
                        else{
                            console.log("new user created");
                            const user = new User({
                                _id: new mongoose.Types.ObjectId(),
                                user_id: totalUser.length.toString(),
                                user_email: req.body.user_email,
                                user_pswd: hash,
                                user_address: req.body.user_address,
                                user_address2: req.body.user_address2,
                                user_city: req.body.user_city,
                                user_stateDetails: req.body.user_stateDetails,
                                user_mobile: req.body.user_mobile,
                                user_totalBids: "0",
                                user_totalBidWins: "0",
                                user_type: req.body.user_type
                            })
                            console.log("new_user",user);
                            user.save()
                            .then(result=>{
                                resolve(result)
                            })
                            .catch(err=>{
                                console.log(err);
                                reject(err);
                            })
                        }
                    })
                })
            }
        })
        .catch(err=>{
            console.log(err);
            reject(err);
        })
    })
}

module.exports = register;