require('dotenv').config();
var express = require('express');
var router = express.Router();
var userModel = require('../models/user');
var passcatModel = require('../models/password_category');
var addpassModel = require('../models/add_password');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');



function checkLoginUser(req, res, next) {
  const token = localStorage.getItem('userToken')
  try {
    jwt.verify(token, process.env.SECRET)
  } catch (err) {
    res.redirect('/');
  }
  next();
}

if (typeof localStorage === "undefined" || localStorage === null) {
  var LocalStorage = require('node-localstorage').LocalStorage;
  localStorage = new LocalStorage('./scratch');
}

function checkEmail(req, res, next) {
  const email = req.body.email;
  const result = userModel.findOne({ email: email })
  result.exec((err, data) => {
    if (err) throw err;
    if (data) {
      return res.render('signup', { title: 'Password Managment System', msg: 'Email Allready Exist' });
    }
    next();
  })
}
function checkUserName(req, res, next) {
  const username = req.body.username;
  const result = userModel.findOne({ username: username })
  result.exec((err, data) => {
    if (err) throw err;
    if (data) {
      return res.render('signup', { title: 'Password Managment System', msg: 'UserName Allready Exist' });
    }
    next();
  })
}
/* GET home page. */
router.get('/',  function(req, res, next) {
  var loginuser = localStorage.getItem('loginuser')
  if (loginuser){
    res.redirect('/dashboard')
  }
  else{
    res.render('index', { title: 'Password Managment System', msg: "" });
  }
});

router.post('/',function (req, res, next) {
  const username = req.body.username;
  const password = req.body.password;
  const checkUser = userModel.findOne({ username: username});
  checkUser.exec((err,data)=>{
    if(err) throw err;
    if(data){
      const getUserId=data._id;
      const pass = bcrypt.compareSync(password, data.password)
      if(pass){
        const token = jwt.sign({ userId: getUserId }, process.env.SECRET);
        localStorage.setItem('userToken',token);
        localStorage.setItem('loginuser', username);
        res.redirect('/dashboard');
      }else{
        res.render('index', { title: 'Password Managment System', msg: "Invalid UserName Or Password" });
      }
    }
  })
});

router.get('/signup', function (req, res, next) {
  var loginuser = localStorage.getItem('loginuser')
  if (loginuser) {
    res.redirect('/dashboard')
  }else{
    res.render('signup', { title: 'Password Managment System', msg: '' });
  }
});

router.post('/signup',checkUserName,checkEmail,function (req, res, next) {
  var username = req.body.username;
  var email = req.body.email;
  var password = req.body.password;
  var cpassword = req.body.cpassword;
  if(password===cpassword){
    const password = bcrypt.hashSync(req.body.password,10);
    const userDetails = new userModel({
      username: username, email: email, password: password})
  userDetails.save((err,result)=>{
    if(err) throw err;
    res.render('signup', { title: 'Password Managment System',msg:'User Registered Successfully' });
  })
}else{
    res.render('signup', { title: 'Password Managment System', msg: 'Password Should Be Matched' });
}
});




















router.get('/logout', function (req, res, next) {
  localStorage.removeItem('userToken');
  localStorage.removeItem('loginuser');
  res.redirect("/");
});
module.exports = router;
