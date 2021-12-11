const express = require('express');
const router = express.Router();
const asyncError = require('../utils/AsyncError')
const user = require('../controller/user');

router.route('/register')
.get(user.renderRegisterPage)
.post(asyncError(user.registerUser))

router.route('/login')
.get(user.renderLoginPage)
.post(user.loginUser)

router.get('/logout',user.deleteUser)


module.exports = router;