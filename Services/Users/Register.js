const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

const User = require('../../Model/User');
const randNumber = require('../../Services/RandomNumber/RandomNumber')

const sendMail = require('../../Controller/Verification').sendMail;
const randomNumber = require('../../Controller/Verification').randomNumber;

console.log("randomNumber", randomNumber);

function register(req, res){
    return new Promise(function(resolve, reject){
        console.log("user_email",req.body.user_email);
        User.find({user_email: req.body.user_email})
        .exec()
        .then(user=>{
            console.log("user",user);
            console.log("length",user.length);
            if(user.length>=1){
                console.log("email already registered");
                const error = {
                    status: 209,
                    message: 'Email already registered'
                }
                reject(error);
            }
            else{
                console.log("new mail id");
                bcrypt.hash(req.body.user_pswd,10,(err,hash)=>{
                    if(err){
                        const error = {
                            status: 500,
                            message: 'Internal Server Error'
                        }
                        reject(error);
                    }
                    else{
                        // Random Number save
                        var id = new mongoose.Types.ObjectId()
                        console.log("id",id);
                        var result_randomNumber = randNumber(id, randomNumber);
                        result_randomNumber
                        .then(res=>{
                            console.log("new user created");
                            const user = new User({
                                _id: id,
                                user_email: req.body.user_email,
                                user_pswd: hash,
                                user_address: req.body.user_address,
                                user_address2: req.body.user_address2,
                                user_city: req.body.user_city,
                                user_stateDetails: req.body.user_stateDetails,
                                user_mobile: req.body.user_mobile,
                                user_totalBids: "0",
                                user_totalBidWins: "0",
                                randomNumber: randomNumber
                            })
                            const mailResponse = sendMail(user.user_email)
                            mailResponse
                            .then(response=>{
                                console.log("response ",response);
                                console.log("new_user",user);
                                user.save()
                                .then(result=>{
                                    const message = {
                                        status: 200,
                                        message: 'User Register Successfully',
                                        user: {
                                            _id: result._id,
                                            user_id: result.user_id,
                                            user_email: result.user_email,
                                            user_pswd: result.user_pswd,
                                            user_address: result.user_address,
                                            user_address2: result.user_address2,
                                            user_city: result.user_city,
                                            user_stateDetails: result.user_stateDetails,
                                            user_mobile: result.user_mobile,
                                            user_totalBids: result.user_totalBids,
                                            user_totalBidWins: result.user_totalBidWins
                                        } 
                                    }
                                    resolve(message)
                                })
                                .catch(err=>{
                                    console.log(err);
                                    const error = {
                                        status: 500,
                                        err: err
                                    }
                                    reject(error)
                                })
                            })
                            .catch(error=>{
                                console.log("Error while sending Verification Code");
                                const err = {
                                    status: 404,
                                    message: 'Email not found',
                                    error: error
                                }
                                reject(err)
                            })
                        })
                        .catch(err=>{
                            console.log("Error while saving random Number");
                            console.log(err);
                            reject(err)
                        })
                    }
                })
            }
        })
        .catch(err=>{
            const error = {
                status: 500,
                err: err
            }
            // res.send(err)
            reject(error)
        })
    })
}

module.exports = register;