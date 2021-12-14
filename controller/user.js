const User = require('../models/user');
const passport = require('passport');

module.exports.renderRegisterPage = (req,res)=>{
    res.render('users/register')
}

module.exports.registerUser = (async(req,res)=>{
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
    
})

module.exports.renderLoginPage = (req,res)=>{
    res.render('users/login')
}

module.exports.loginUser = (req,res)=>{
    req.flash('success','Welcome Back!!')
    const redirectUrl = req.session.returnTo || '/camps'
    delete req.session.returnTo
    res.redirect(redirectUrl)
}

module.exports.logout = (req,res)=>{
    req.logout()
    req.flash('success', 'You have successfully logged out!')
    res.redirect('/camps')
}