var express = require('express');
var router = express.Router();
const { addArticle, editArticle, deleteArticle, viewOwnArticle, viewArticle, searchAndSorting } = require('../controllers/blog/articlesController');
const { logincheck } = require('../middleware/auth');

router.post('/addArticle', logincheck, addArticle);
router.put('/updateArtivle/:_id', logincheck, editArticle );
router.delete('/deleteArticle/:_id', logincheck, deleteArticle )
router.get('/viewArticle', logincheck, viewArticle)
router.get('/searchAndSorting', logincheck, searchAndSorting)
module.exports = router;
