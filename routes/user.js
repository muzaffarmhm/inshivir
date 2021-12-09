const express = require('express');
const router = express.Router();
const asyncError = require('../utils/AsyncError')
const passport = require('passport')
const User = require('../models/user');


router.get('/register',(req,res)=>{
    res.render('users/register')
})

router.post('/register',asyncError(async(req,res)=>{
    try{
        const {username, email, password} = req.body;
    const user = new User({username, email})
    const registeredUser = await User.register(user, password)
    req.login(registeredUser, err=>{
        if(err) return next(err)
        req.flash('success','Welcome to Inshivir!!')
        res.redirect('/camps')
    })
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
    const redirectURL = req.session.redirectURL || '/camps'
    delete req.session.redirectURL
    res.redirect(redirectURL)
})

router.get('/logout',(req,res)=>{
    req.logout()
    req.flash('success', 'You have successfully logged out!')
    res.redirect('/camps')
})




module.exports = router;