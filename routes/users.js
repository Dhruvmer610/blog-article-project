var express = require('express');
var router = express.Router();
const  userValidation = require('../validation/userValidtion');
const { register, login, upadetUser, deleteUser } = require('../controllers/user/registerController');
const { logincheck } = require('../middleware/auth');

router.post('/register', userValidation.userValidation, register);
router.post('/login', login);
router.put('/update', logincheck, upadetUser);
router.delete('/delete', logincheck, deleteUser);
module.exports = router;
