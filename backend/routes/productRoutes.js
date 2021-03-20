import express from 'express';
const router=express.Router();
import asyncHandler from 'express-async-handler'
import Products from './../data/products.js'
//fetch all products
router.get('/',asyncHandler( async (req,res) => {
 //   const products= await 

    res.json(Products)
}))

router.get('/:id',asyncHandler( async (req,res) => {
    const product= Products.filter(product=> product._id==req.params.id)
    if(product)
    res.json(product[0])
    else{
        // res.status(404).json({message:'Product not found'})
        throw new Error("Product Not FOUND")
    }
}))
export default router