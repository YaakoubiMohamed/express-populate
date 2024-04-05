const express = require('express');
const router = express.Router();


const articleController = require('../controllers/articleController');

router.get('/', articleController.getAllArticles);
// Get an Article by its ID
router.get('/:id',articleController.getArticlebyId);
router.post('/', articleController.createArticle);
router.put('/:id', articleController.updateArticle);
router.delete('/:id', articleController.deleteArticle);
module.exports=router;