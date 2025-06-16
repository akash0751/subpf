const express = require('express');
const router = express.Router();
const {registerForm,login} = require('../contoller/user')

router.post('/register',registerForm)
router.post('/login',login) 

module.exports = router;