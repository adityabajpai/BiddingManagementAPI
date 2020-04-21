const express = require('express');
var multer  = require('multer');
const router = express.Router();
var upload = multer({ dest: 'uploads/' })
const getProduct = require('../Services/Product/GetProduct');
const postProduct = require('../Services/Product/PostProduct');
const updateProduct = require('../Services/Product/UpdateProduct');
const deleteProduct = require('../Services/Product/DeleteProduct')

router.post('/Product', upload.single('product_img'), (req,res)=>{
    var result = postProduct(req);
    result
    .then(product=>{
            res.status(200).json({
            message: 'Product Uploaded Successfully',
            user: {
                _id: product._id,
                product_id: product.product_id,
                product_name: product.product_name,
                product_img: product.product_img,
                product_bidding_price: product.product_bidding_price,
                product_description: product.product_description,
                product_uploadDate: product.product_uploadDate,
                product_bidding_EndDate: product.product_bidding_EndDate,
                product_userId: product.product_userId,
                product_userEmail: product.product_userEmail
            }
        })
    })
    .catch(err=>{
        console.log(err.status);
        console.log(err);
    })
})

router.get('/Product',(req,res)=>{
    var result = getProduct(req, res);

    result
    .then(products=>{
        console.log("success");
        console.log(products);
        res.status(200).json({
            count: products.length,
            product: products
        })
    })
    .catch(err=>{
        console.log("error");
        console.log(err);
    })
})

router.patch('/Product/:productId',(req,res)=>{
    console.log("updateProduct");
    console.log(req.params.productId);
    console.log(req);
})

router.delete('/Product/:productId',(req,res)=>{
    console.log("deleteProduct");
    var result = deleteProduct(req);

    result
    .then(product=>{
        res.status(200).json({
            message: 'Product deleted',
            response: product
        })
    })
    .catch(err=>{
        console.log(err);
    })
})

module.exports = router;