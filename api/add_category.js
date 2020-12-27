const express=require('express');
const router=express.Router();
const passCat=require('.././models/password_category');
const passCatPassword = require('.././models/add_password');
router.get('/getCategory',(req,res,next)=>{
    const result = passCat.find({}, {'password_category':1})
    result.exec((err,data)=>{
        if(err) throw err;
        if(data){
            return res.status(200).json({
                message:"User Find Successsfully",
                data:data
            })
        }
    })
})

router.post('/add-category', (req, res, next) => {
    const pass=req.body.passwordCategory;
    const result = new passCat({ password_category: pass})
    result.save((err,data)=>{
        if(err) throw err;
        if(data){
            res.status(200).json({
                message:"Category Created Successfully",
                data:data
            })
        }
    })
})

router.post('/add-password', (req, res, next) => {
    const cat = req.body.passwordCategory;
    const detail = req.body.passwordDetails;
    const result = new passCatPassword({password_category: cat, password_details:detail })
    result.save((err, data) => {
        if (err){
            res.json({
                err:err
            })
        }
        if (data) {
            res.status(200).json({
                message: "Data Interted Into Database Successfully",
                data: data
            })
        }
    })
})

router.get('/add-password', (req, res, next) => {
    const result = passCatPassword.find().select("password_category password_details")
    result.exec((err, data) => {
        if (err) {
            res.json({
                err: err
            })
        }
        if (data) {
            res.status(200).json({
                message: "Data Is",
                data: data
            })
        }
    })
})





router.post('/add-update-category/:id', (req, res, next) => {
    const id=req.params.id;
    const password_category = req.body.password_category;
    const result=passCat.findByIdAndUpdate(id, {password_category: password_category})
    result.exec((err,data)=>{
        if(err) throw err;
        if(data){
            res.status(200).json({
                message:"Record Updated Successfully",
                data:data
            })
        }
    })
})

router.patch('/update-category', (req, res, next) => {
    res.send("hello from Patch  category api")
})

router.delete('/delete-category/:id', (req, res, next) => {
    var dalCategory=req.params.id;
    var result=passCat.findByIdAndDelete(dalCategory)
    result.exec((err)=>{
        if(err) throw err;
        res.status(200).json({
            message:"Record Deleted Successfulluy"
        })
    })
})
module.exports=router;