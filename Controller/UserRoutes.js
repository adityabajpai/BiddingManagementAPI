const express = require('express');
const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');
const mongoose = require('mongoose');
const router = express.Router();
const User = require('../Model/User');

router.post('/Register',(req, res)=>{
    console.log("user_email",req.body.user_email);
    User.find({user_email: req.body.user_email})
    .exec()
    .then(user=>{
        console.log("user",user);
        console.log("length",user.length);
        if(user.length>=1){
            console.log("email already registered");
            return res.status(409).json({
                message: 'Email already registered'
            });
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
                        return res.status(500).json({
                            err: err
                        })
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

                            res.status(200).json({
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
                                    user_totalBidWins: result.user_totalBidWins,
                                    user_type: result.user_type
                                }
                            })
                        })
                        .catch(err=>{
                            console.log(err);
                        })
                    }
                })
            })
        }
    })
    .catch(err=>{
        console.log(err);
    })
})

router.post('/Login',(req,res)=>{
    // console.log(process.env.JWT_KEY);
    User.findOne({user_email: req.body.user_email})
    .exec()
    .then(user=>{
        if(user.length<1){
            console.log('user not found');
            return res.status(401).json({
                message: 'user not found'
            });
        }
        else{
            bcrypt.compare(req.body.user_pswd, user.user_pswd, (err, result)=>{
                if(err){
                    // mail id exist but some error occurred
                    console.log('incorrect password');
                    
                    return res.status(401).json({
                        message: 'incorrect password'
                    })
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
                        return res.status(200).json({
                            message: 'Auth successful',
                            token: token,
                            type: user.user_type
                        })
                    }
                    return res.status(401).json({
                        message: 'Auth failed'
                    })
                }
            })
        }
    })
    .catch(err=>{

    })
})

//update user 
router.patch('/User/:userId',(req, res)=>{
    // 5e8af699230e8b30bc0e5671
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
        res.status(200).json({
            message: 'User updated',
            updateUser: result
        })
    })
    .catch(err=>{
        res.status(500).json({
            error: err
        })
    })
})

//delete user
router.delete('/User/:userId', (req, res)=>{
    const id = req.params.userId;
    User.remove({_id: id})
    .exec()
    .then(result=>{
        res.status(200).json({
            message: 'User deleted',
            response: result
        })
    })
    .catch((err)=>{
        res.status(500).json({
            error: err
        })
    })
})

module.exports = router;