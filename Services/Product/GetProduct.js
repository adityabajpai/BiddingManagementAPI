const Product = require('../../Model/Product');
var date = new Date(Date.now());
var todayDate = date.toLocaleDateString();

function getProduct(){
    return new Promise(function(resolve, reject){
        console.log("todayDate", todayDate);
        Product.find()
        .where('product_bidding_EndDate').gte(todayDate)
        .select()
        .exec()
        .then(products=>{
            console.log(products);
            resolve(products)
        })
        .catch(err=>{
            reject(err)
        })
    })
}

module.exports = getProduct;