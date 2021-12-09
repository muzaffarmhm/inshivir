const express = require('express');
const router = express.Router();
const asyncError = require('../utils/AsyncError')
const passport = require('passport')

const User = require('../models/user');
const { append } = require('express/lib/response');
const res = require('express/lib/response');

router.get('/register',(req,res)=>{
    res.render('users/register')
})

router.post('/register',asyncError(async(req,res)=>{
    try{
        const {username, email, password} = req.body;
    const user = new User({username, email})
    const registeredUser = await User.register(user, password)
    console.log(registeredUser);
    req.flash('success','Welcome to Inshivir!!')
    res.redirect('/camps')
    }
    catch(e){
        console.log(e);
        req.flash('error', e.message)
        res.redirect('register')
    }
    
}))

router.get('/login',(req,res)=>{
    res.render('users/login')
})

router.post('/login',passport.authenticate('local',{failureFlash: true, failureRedirect:'/login'}),(req,res)=>{
    req.flash('success','Welcome Back!!')
    res.redirect('/camps')
})





module.exports = router;