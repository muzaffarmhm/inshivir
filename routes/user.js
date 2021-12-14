const express = require('express');
const router = express.Router();
const asyncError = require('../utils/AsyncError')
const user = require('../controller/user');
const passport = require('passport');

router.route('/register')
.get(user.renderRegisterPage)
.post(asyncError(user.registerUser))

router.route('/login')
.get(user.renderLoginPage)
.post(passport.authenticate('local',{failureFlash: true, failureRedirect:'/login'}),user.loginUser)

router.get('/logout',user.logout)


module.exports = router;