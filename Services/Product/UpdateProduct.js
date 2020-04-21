const Product = require('../../Model/Product');

function updateProduct(req){
    return new Promise (function(resolve, reject){
        const product = {
            product_name: req.body.product_name,
            product_img: req.body.product_img,
            product_bidding_price: req.body.product_bidding_price,
            product_description: req.body.product_description,
            product_uploadDate: req.body.product_uploadDate,
            product_bidding_EndDate: req.body.product_bidding_EndDate,
            product_userId: req.body.product_userId,
            product_userEmail: req.body.product_userEmail
        }
        Product.updateOne({ _id: req.params.productId }, { $set: product })
        .exec()
        .then(result=>{
            resolve(result)
        })
        .catch(err=>{
            reject(err)
        })
    })
}

module.exports = updateProduct;