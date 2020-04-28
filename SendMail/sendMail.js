const nodemailer = require('nodemailer')

function sendMail(email, randomNumber) {

  
  return new Promise(function(resolve, reject){

    var transport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.emailId,
        pass: process.env.password
      }
    })
  
    var mailOptions = {
      from: process.env.emailId,
      to: email,
      subject: 'Verification Code from Bidding Management System',
      text: 'Verification Code '+randomNumber
    };
  
    transport.sendMail(mailOptions, (error, info)=>{
      if(error) {
        console.log("Mail error", error);
        reject(error)  
      } else {
        console.log("Mail response", info.response);
        resolve(info.response)
      }
    })
  })
}



module.exports = {
  sendMail: sendMail
};