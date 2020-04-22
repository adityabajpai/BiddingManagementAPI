const mongoose = require('mongoose');

const url = process.env.url;

function mongoDBConnection(){
    console.log("hello");
    console.log(process.env.url);
    
    return new Promise(function(resolve, reject){
        mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        .then((response)=>{
            console.log('MongoDB Connect');
            resolve(response);
        })
        .catch((err)=>{
            console.log('MongoDB connection failed');
            console.log(err);
            reject(err);
        })
    })
}

module.exports = {
    mongoDBConnection : mongoDBConnection
}