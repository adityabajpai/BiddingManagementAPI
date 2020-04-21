const Product = require('../../Model/Product');
var todayDate = date.toLocaleDateString();

function getProduct(){
    console.log("todayDate", todayDate);
    Product.find()
    .where('product_bidding_EndDate').gte(todayDate)
    .select()
    .exec()
    .then(products=>{
        res.status(200).json({
            count: products.length,
            product: products.map(product=>{
                return{
                    _id : product._id,
                    product_id : product.product_id,
                    product_name : product.product_name,
                    product_img : product.product_img,
                    product_bidding_price : product.product_bidding_price,
                    product_description : product.product_description,
                    product_bidding_EndDate : product.product_bidding_EndDate,
                    product_userId : product.product_userId,
                    product_userEmail : product.product_userEmail,
                }
            })
        })
    })
    .catch(err=>{
        res.status(404).json({
            message: 'Retrieval Failed',
            error: err
        })
    })
}

module.exports = getProduct();