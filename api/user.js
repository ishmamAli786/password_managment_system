var express = require('express');
var router = express.Router();
const userModel=require('.././models/user');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
var checkAuth = require('./middleware/auth');



router.post('/signup', checkAuth, (req,res,next)=>{
    console.log(req.userData)
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const passwords=bcrypt.hashSync(password,10);
    const result = new userModel({ username: username, email: email, password: passwords})
    result.save((err,data)=>{
        if(err){
            res.json({
                err:err
            })
        }
        if(data){
            res.status(200).json({
                message:"User Registered Successfully",
                data:data
            })
        }
    })
})


router.post('/signin', (req, res,next) => {
    const username = req.body.username;
    const result = userModel.find({ username: username})
    result.exec((err, data) => {
        if (err) {
            res.json({
                err: err
            })
        }
        if (data) {
            const check=bcrypt.compareSync(req.body.password,data[0].password)
            if(check){
                var token=jwt.sign({ username: data[0].username, userid: data[0]._id }, 'secret',{expiresIn:'1h'})
                res.status(200).json({
                    message: "User Login Successfully",
                    token:token,
                    data:data
                })
            }else{
                res.json({
                    message: "Invalid Username or Password",
                })
            }
        }
    })
})




module.exports=router;