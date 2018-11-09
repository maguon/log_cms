const express = require('express')
const router = express.Router({mergeParams:true});

const ContentController = require('../controller/ContentController');

router.get('/content', ContentController.getContent);
router.post('/content', ContentController.createContent);
router.put('/content/:contentId', ContentController.updateContent);
router.delete('/content/:contentId', ContentController.removeContent);

module.exports = router