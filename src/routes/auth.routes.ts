const express = require('express');
const router = express.Router();
const { signup, sayHello, login } = require("../controller/auth.controller");

// router.post('/signup', signup);
// router.post('/login', login);

// router.get('/say', sayHello);

export {router};