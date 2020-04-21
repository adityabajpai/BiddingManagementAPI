const mongoose = require('mongoose');

const url = 'mongodb+srv://Bidding:Bidding@cluster0-ki6qp.mongodb.net/test?retryWrites=true&w=majority';

function mongoDBConnection(){
    console.log("hello");
    
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