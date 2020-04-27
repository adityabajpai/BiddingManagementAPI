const sgMail = require('@sendgrid/mail');

var randomNumber = Math.floor(Math.random()*1000000)

function sendMail(email){
  return new Promise(function(resolve, reject){
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
      to: email,
      from: 'adityabajpai444@gmail.com',
      subject: 'Verification Code from Bidding Management System',
      text: 'Verification Code',
      html: 'Verification Code<strong>'+randomNumber+'</strong>',
    };
    const x = sgMail.send(msg)
    console.log("x "+x);
    x
    .then(msg=>{
      resolve(msg)
    })
    .catch(err=>{
      reject(err)
    })
  })
}

module.exports = {
  sendMail: sendMail,
  randomNumber: randomNumber
};