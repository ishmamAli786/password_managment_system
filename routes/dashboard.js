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

router.get('/', checkLoginUser, function (req, res, next) {
    var loginuser = localStorage.getItem('loginuser')
    res.render('dashboard', { title: "User Dashboard", loginuser: loginuser });
});

module.exports = router;