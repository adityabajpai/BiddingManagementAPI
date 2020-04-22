const Product = require('../Model/Product');
const express = require('express');
const router = express.Router();
var date = new Date(Date.now());
var todayDate = date.toLocaleDateString();

// auto run api at the end of day to save all the product whose bidding end date is gone then save the maximum final bid and 
// allocate that bid to user and remove that particular product from the list of all products

function removeProduct() {
    console.log("remove Product");
    
    Product.find()
    .where('product_bidding_EndDate').lte(todayDate)
    .select()
    .exec()
    .then(products=>{
        console.log(products);
        //find all products whose bidding end date is before today date
        // save final bid 
        // remove the product
    })
    .catch(err=>{
        console.log(err);
    })
}

module.exports = removeProduct;