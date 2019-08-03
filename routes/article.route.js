const express = require('express');
const router = express.Router();

const articleController = require('../controllers/article');

router.post('/', articleController.createArticle);
router.put('/:id', articleController.updateArticle);
router.delete('/:id', articleController.deleteArticle);
router.get('/', articleController.getArticle)

module.exports = router;