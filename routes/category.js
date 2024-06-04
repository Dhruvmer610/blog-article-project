var express = require('express');
var router = express.Router();

const { deleteCategory, addCategory } = require('../controllers/blog/categoryController');

router.post('/addCategory', addCategory)
router.delete('/deleteCategory/:_id', deleteCategory)

module.exports = router;
