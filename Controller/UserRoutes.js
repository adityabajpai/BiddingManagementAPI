const express = require('express');
const router = express.Router();
var validator = require('validator')
var passwordValidator = require('password-validator');
const register = require('../Services/Users/Register');
const login = require('../Services/Users/Login')
const updateUser = require('../Services/Users/UpdateUser')
const deleteUser = require('../Services/Users/DeleteUser')

router.post('/Register', (req, res)=>{
    var schema = new passwordValidator();
    schema
    .is().min(8)
    .is().max(20)
    .has().uppercase()
    .has().lowercase()
    .has().digits()
    .has().symbols()
    .has().not().spaces()
    .is().not().oneOf(['Passw0rd', 'Password123']);
    const emailCheck = validator.isEmail(req.body.user_email)
    console.log("email", emailCheck);
    const mobileCheck = validator.isMobilePhone(req.body.user_mobile, ['en-IN'])
    console.log("mobile ",mobileCheck);
    const pswdCheck = schema.validate(req.body.user_pswd)
    console.log(pswdCheck);
    if(emailCheck && mobileCheck) {
        console.log('all valid');
        var result = register(req, res);
        result
        .then(user=>{
            res.send(user)
        })
        .catch(err=>{
            res.send(err)
        })
    }
    else {
        console.log('else')
        if(!emailCheck) {
            res.status(422).json({
                statusCode: 422,
                message: 'Email is not valid'
            })
        } else if (!mobileCheck) {
            res.status(422).json({
                statusCode: 422,
                message: 'Mobile Number is not valid'
            })
        } 
        // else if (!pswdCheck) {
        //     res.status(422).json({
        //         statusCode: 422,
        //         message: 'Password is not valid'
        //     })
        // }
    }
})

router.post('/Login',(req,res)=>{
    const emailCheck = validator.isEmail(req.body.user_email)
    console.log("email", emailCheck);
    if(emailCheck) {
        console.log(req.body);
        var result = login(req, res)
        result
        .then(user=>{
            res.send(user)
        })
        .catch(err=>{
            res.send(err);
        })
    } else {
        res.status(422).json({
            statusCode: 422,
            message: 'Email is not valid'
        })
    }
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