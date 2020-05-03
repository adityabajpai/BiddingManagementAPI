const Product = require('../../Model/Product');
var path = require('path');
const mongoose = require('mongoose');

function PostProduct(req){
    return new Promise(function(resolve, reject){
        var parentDirectory = path.resolve(__dirname, '../..')
        parentDirectory = parentDirectory+'\\'+req.file.path;
        Product.find()
        .exec()
        .then(totalProduct=>{
            console.log(totalProduct);
            console.log(totalProduct.length);
            const product = new Product({
                _id: new mongoose.Types.ObjectId(),
                product_id: totalProduct.length,
                product_name: req.body.product_name,
                product_img: parentDirectory,
                product_bidding_price: req.body.product_bidding_price,
                product_description: req.body.product_description,
                product_uploadDate: Date.now(),
                product_bidding_EndDate: req.body.product_bidding_EndDate,
                product_userId: req.body.product_userId,
                product_userEmail: req.body.product_userEmail
            })
            product.save()
            .then(result=>{
                resolve(result);
            })
            .catch(err=>{
                reject(err);
            })
        })
        .catch(err=>{
            reject(err)
        })
    })
}

module.exports = PostProduct;