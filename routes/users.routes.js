const express = require("express");
const router = express.Router();
const {registerUser} = require('../controllers/registerUser.controller')
const {loginUser} = require('../controllers/loginUser.controller');
const {getAllUser} = require('../controllers/User.controller');


router.get('/',getAllUser);


router
    .route('/register')
    .post(registerUser);

router
    .route('/login')
    .post(loginUser)


module.exports = router;