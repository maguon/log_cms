const express = require('express')
const router = express.Router({mergeParams:true});


const ContentController = require('../controller/ContentController');
const AdminController = require('../controller/AdminController');
const UserController = require('../controller/UserController');

router.get('/content', ContentController.getContent);
router.post('/content', ContentController.createContent);
router.put('/content/:contentId', ContentController.updateContent);
router.delete('/content/:contentId', ContentController.removeContent);

router.get('/admin/:adminId', AdminController.getAdmin);
router.post('/admin' ,AdminController.createAdmin);

router.get('/user', UserController.getUser);
router.post('/user', UserController.createUser);
router.put('/user/:userId', UserController.updateUser);


module.exports = router
