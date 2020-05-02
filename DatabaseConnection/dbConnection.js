const mongoose = require('mongoose');

const url = process.env.url;

function mongoDBConnection(){
    console.log("hello");
    // console.log(process.env.url);
    
    return new Promise(function(resolve, reject){
        mongoose.connect('mongodb+srv://Bidding:Bidding@cluster0-ki6qp.mongodb.net/test?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        .then((response)=>{
            console.log('MongoDB Connect');
            mongoose.connection.on('connected', function () {
                console.log('Mongoose default connection open to ' + process.env.url);
            });
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