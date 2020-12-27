const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
    product_name: {
        type: String,
        required:true,
    },
    price: {
        type: Number,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    image:{
        type:String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now()
    }
})

const productModel = new mongoose.model('product', productSchema );
module.exports = productModel;