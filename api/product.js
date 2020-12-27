const express=require('express');
const router=express.Router();
const product=require('.././models/product');
const multer=require('multer');


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now()+file.originalname)
    }
})


const fileFilter =(req, file, cb)=>{
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype==='image/png'){
        cb(null,true);
    }else{
        cb(null,false);
    }
}

var upload=multer({
    storage: storage,
    limits:{
        fileSize: 1024*1024*5
    },
    fileFilter: fileFilter
})


///image paht
// limit
/// filter

router.get('/',(req,res)=>{
    res.send("This is Product api")
})


router.post('/',upload.single('productImage'),(req,res)=>{
    const name = req.body.name;
    const price = req.body.price;
    const quantity = req.body.quantity;
    const image = req.file.path;
    const result = new product({ product_name: name, price: price, quantity: quantity, image: image})
    result.save((err,data)=>{
        if(err){
            res.json({
                err:err
            })
        }
        if(data){
            res.status(200).json({
                message:"Data Inserted Successfully",
                data:data
            })
        }
    })
})

module.exports=router;