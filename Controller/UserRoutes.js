const express = require('express');
const router = express.Router();
// const { check, validationResult } = require('express-validator');
// const { Validator } = require('node-input-validator');
const register = require('../Services/Users/Register');
const login = require('../Services/Users/Login')
const updateUser = require('../Services/Users/UpdateUser')
const deleteUser = require('../Services/Users/DeleteUser')

router.post('/Register', (req, res)=>{
    // const validation = new Validator(req.body,{
    //     "user_email": 'required|email',
    //     "user_pswd": 'required',
    //     "user_address": 'required',
    //     "user_address2": 'required',
    //     "user_city": 'required',
    //     "user_stateDetails": 'required',
    //     "user_mobile": 'required'
    // })
    // const matched = await validation.check()
    // console.log(matched);
    
    var result = register(req, res);
    result
    .then(user=>{
        res.send(user)
    })
    .catch(err=>{
        res.send(err)
    })
})

router.post('/Login',(req,res)=>{
    console.log(req.body);
    var result = login(req, res)
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
    var result = updateUser(req, res)
    result
    .then(user=>{
        res.send(user);
    })
    .catch(err=>{
        res.send(err);
    })
})

//delete user
router.delete('/User/:Id', (req, res)=>{
    console.log('deleteUser')
    var result = deleteUser(req, res);
    result
    .then(user=>{
        res.send(user)
    })
    .catch(err=>{
        res.send(err)
    })
})

module.exports = router;