const express = require('express')
const router = express.Router({mergeParams:true});


const ContentController = require('../controller/ContentController');
const AdminController = require('../controller/AdminController');
const UserController = require('../controller/UserController');
const MenuController = require('../controller/MenuController');

router.get('/content', ContentController.getContent);
router.post('/content', ContentController.createContent);
router.put('/content/:contentId', ContentController.updateContent);
router.delete('/content/:contentId', ContentController.removeContent);

router.get('/admin/:adminId', AdminController.getAdmin);
router.post('/adminLogin' ,AdminController.adminLogin);
router.post('/admin' ,AdminController.createAdmin);

router.get('/user', UserController.getUser);
router.get('/user/:userId', UserController.getUserBase);
router.post('/user', UserController.createUser);
router.post('/userLogin' ,UserController.userLogin);
router.put('/user/:userId', UserController.updateUser);
router.put('/user/:userId/password', UserController.changeUserPassword);
router.put('/user/:userId/status/:status', UserController.updateUserStatus);

router.get('/menu', MenuController.getMenu);
router.post('/user/:userId/menu', MenuController.createMenu);


module.exports = router
