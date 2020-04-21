const Product = require('../../Model/Product');

function updateProduct(req){
    return new Promise (function(resolve, reject){
        const product = {
            product_name: req.body.product_name,
            product_bidding_price: req.body.product_bidding_price,
            product_description: req.body.product_description,
            product_bidding_EndDate: req.body.product_bidding_EndDate,
        }
        Product.updateOne({ _id: req.params.productId }, { $set: product })
        .exec()
        .then(result=>{
            console.log("success");
            resolve(result)
        })
        .catch(err=>{
            console.log("error");
            reject(err)
        })
    })
}

module.exports = updateProduct;