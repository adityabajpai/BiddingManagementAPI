const express = require('express');
const router = express.Router();
const randomNumber = require('../Services/RandomNumber/RandomNumber');
const sendMail = require('../SendMail/sendMail').sendMail;


router.post('/verification',(req, res)=>{
    var randNumber = Math.floor(Math.random()*1000000)
    var result = randomNumber(req.body.user_id, randNumber)
    result
    .then(response=>{
        console.log(response);
        const mailResponse = sendMail(req.body.user_email, randNumber)
        mailResponse
        .then(mailRes=>{
            res.status(200).json({
                message: 'Email Send Successfully',
                msg: mailRes
            })
        })
        .catch(mailErr=>{
            res.status(500).json({
                message: 'Internal Server Error',
                msg: mailErr
            })
        })
    })
    .catch(error=>{
        console.log(error);
    })
})

module.exports = router;