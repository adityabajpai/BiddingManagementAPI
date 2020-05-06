const express = require('express');
var multer  = require('multer');
var validator = require('validator')
const router = express.Router();
var upload = multer({ dest: 'uploads/' })
const getProduct = require('../Services/Product/GetProduct');
const postProduct = require('../Services/Product/PostProduct');
const updateProduct = require('../Services/Product/UpdateProduct');
const deleteProduct = require('../Services/Product/DeleteProduct')

router.post('/Product', upload.single('product_img'), (req,res)=>{
    // console.log("request", req.body)
    // const product_bidding_priceCheck = isNaN(req.body.product_bidding_price)
    // console.log("product_bidding_priceCheck ",product_bidding_priceCheck)
    // const product_bidding_EndDateCheck = ! isNaN((new Date(req.body.product_bidding_EndDate)).getMonth())
    // console.log("product_bidding_EndDateCheck ",product_bidding_EndDateCheck)
    // const emailCheck = validator.isEmail(req.body.user_email)
    // console.log("emailCheck", emailCheck);
    // const description = req.body.product_description
    // const product_descriptionCheck = description.length()
    // console.log("product_descriptionCheck ",product_descriptionCheck)
    var result = postProduct(req);
    result
    .then(product=>{
            res.status(200).json({
            status: 200,
            message: 'Product Uploaded Successfully',
            product: {
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
        res.status(500).json({
            status: 500,
            message: 'Something went wrong...',
            error: err
        })
    })
})

router.get('/Products', (req,res)=>{
    var result =  getProduct();
    console.log(result);
    result
    .then(products=>{
        console.log("success");
        console.log(products);
        res.status(200).json({
            status: 200,
            product: products
        })
    })
    .catch(err=>{
        console.log("error");
        console.log(err);
        res.status(500).json({
            status: 500,
            error: err
        })
    })
})

router.patch('/Product/:productId',(req,res)=>{
    console.log("updateProduct");
    console.log(req.params.productId);
    var result = updateProduct(req);
    result
    .then(product=>{
        console.log("success 1");
        res.status(200).json({
            status: 200,
            message: 'Product Updated Successfully'
        })
    })
    .catch(err=>{
        res.status(500).json({
            status: 500,
            error: err
        })
    })
    
})

router.delete('/Product/:Id',(req,res)=>{
    console.log("deleteProduct");
    var result = deleteProduct(req);

    result
    .then(product=>{
        res.status(200).json({
            status: 200,
            message: 'Product deleted'
        })
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            status: 500,
            message: 'Something went wrong...'
        })
    })
})

module.exports = router;