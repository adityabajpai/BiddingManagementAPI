const express = require('express');
const mongoose = require('mongoose');
var multer  = require('multer');
var path = require('path');
const router = express.Router();
var upload = multer({ dest: 'uploads/' })
const Product = require('../Model/Product');
var date = new Date(Date.now());
var todayDate = date.toLocaleDateString();

var parentDirectory = path.resolve(__dirname, '..');

// router.post('/uploadImage', upload.single('product_img'), (req, res)=>{
//     console.log("uploadProduct");
//     console.log(parentDirectory);
// })

router.post('/Product', upload.single('product_img'), (req,res)=>{
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
            res.status(200).json({
                message: 'Product Uploaded Successfully',
                user: {
                    _id: result._id,
                    product_id: result.product_id,
                    product_name: result.product_name,
                    product_img: result.product_img,
                    product_bidding_price: result.product_bidding_price,
                    product_description: result.product_description,
                    product_uploadDate: result.product_uploadDate,
                    product_bidding_EndDate: result.product_bidding_EndDate,
                    product_userId: result.product_userId,
                    product_userEmail: result.product_userEmail
                }
            })
        })
        .catch(err=>{
            console.log(err);
            res.status(404).json({
                message: 'Product upload failed',
                error: err
            })
        })
    })
    .catch(err=>{
        res.status(500).json({
            message: 'Error'
        })
        console.log(err);
    })
})

router.get('/Product',(req,res)=>{
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
})

router.patch('/Product/:productId',(req,res)=>{
    console.log("updateProduct");
    const product = {
        product_name: result.product_name,
        product_img: result.product_img,
        product_bidding_price: result.product_bidding_price,
        product_description: result.product_description,
        product_uploadDate: result.product_uploadDate,
        product_bidding_EndDate: result.product_bidding_EndDate,
        product_userId: result.product_userId,
        product_userEmail: result.product_userEmail
    }
    Product.updateOne({ _id: req.params.productId }, { $set: product })
    .exec()
    .then(result=>{
        res.status(200).json({
            message: 'Product Updated',
            response: result
        })
    })
    .catch(err=>{
        res.status(500).json({
            message: 'Product Updation failed',
            error: err
        })
    })
})

router.delete('/Product/:productId',(req,res)=>{
    console.log("deleteProduct");
    Product.remove({_id: id})
    .exec()
    .then(result=>{
        res.status(200).json({
            message: 'Product deleted',
            response: result
        });
    })
    .catch(err=>{
        res.status(500).json({
            message: 'Product deletion failed',
            error: err
        })
    })
})

module.exports = router;