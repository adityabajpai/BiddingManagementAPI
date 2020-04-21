const express = require('express');
const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');
const mongoose = require('mongoose');
const router = express.Router();
const User = require('../Model/User');
const register = require('../Services/Users/Register');
const login = require('../Services/Users/Login')
const updateUser = require('../Services/Users/UpdateUser')
const deleteUser = require('../Services/Users/DeleteUser')

router.post('/Register',(req, res)=>{
    var result = register(req);
    result
    .then(user=>{
        res.status(200).json({
            message: 'User Register Successfully',
            user: {
                _id: user._id,
                user_id: user.user_id,
                user_email: user.user_email,
                user_pswd: user.user_pswd,
                user_address: user.user_address,
                user_address2: user.user_address2,
                user_city: user.user_city,
                user_stateDetails: user.user_stateDetails,
                user_mobile: user.user_mobile,
                user_totalBids: user.user_totalBids,
                user_totalBidWins: user.user_totalBidWins,
                user_type: user.user_type
            }
        })
    })
    .catch(err=>{
        res.send(err);
    })
})

router.post('/Login',(req,res)=>{
    var result = login(req)
    result
    .then(user=>{
        res.send(user)
    })
    .catch(err=>{
        res.send(err);
    })
})

//update user 
router.patch('/User/:userId',(req, res)=>{
    // 5e8af699230e8b30bc0e5671
    var result = updateUser(req)
    result
    .then(user=>{
        res.send(user);
    })
    .catch(err=>{
        res.send(err);
    })
})

//delete user
router.delete('/User/:userId', (req, res)=>{
    var result = deleteUser(req);
    result
    .then(user=>{
        res.send(user)
    })
    .catch(err=>{
        res.send(err)
    })
})

module.exports = router;