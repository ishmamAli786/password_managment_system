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
    const category = passcatModel.find({});
    category.exec((err, data) => {
        if (err) throw err;
        if (data) {
            var loginuser = localStorage.getItem('loginuser')
            res.render('add-new-password', { title: "Add New Password", loginuser: loginuser, data: data });
        }
    })
});

router.post('/', function (req, res, next) {
    const password_category = req.body.pass_category;
    const pass_details = req.body.pass_details;
    const pass_save = new addpassModel({ password_category: password_category, password_details: pass_details })
    pass_save.save((err, result) => {
        if (err) throw err;
        if (result) {
            res.redirect('/view-all-password')
        }
    })
});

router.get('/delete/:id', checkLoginUser, function (req, res, next) {
    const id = req.params.id;
    const delet = addpassModel.findByIdAndDelete(id)
    delet.exec((err, data) => {
        if (err) throw err
        if (data) {
            res.redirect('/view-all-password')
        }
    })
});

router.get('/edit/:id', checkLoginUser, function (req, res, next) {
    const id = req.params.id;
    const edit = addpassModel.findById(id)
    edit.exec((err, data) => {
        if (err) throw err
        if (data) {
            var loginuser = localStorage.getItem('loginuser')
            res.render('edit_password', { title: "Update Password", data: data, loginuser: loginuser })
        }
    })
});

router.post('/update', checkLoginUser, function (req, res, next) {
    const id = req.body.id;
    const password_category = req.body.password_category;
    const pass_details = req.body.pass_details;
    const update = addpassModel.findByIdAndUpdate(id, { password_category: password_category, password_details: pass_details })
    update.exec((err, data) => {
        if (err) throw err;
        if (data) {
            res.redirect('/view-all-password')
        }
    })
});


module.exports = router;