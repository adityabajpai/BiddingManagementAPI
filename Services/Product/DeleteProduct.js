const Product = require('../../Model/Product')

function deleteProduct(req){
    return new Promise(function(resolve, reject){
        Product.deleteOne({_id: req.params.productId})
        .exec()
        .then(result=>{
            resolve(result)
        })
        .catch(err=>{
            reject(err)
        })
    })
}

module.exports = deleteProduct;