const express = require('express')
const router = express.Router({mergeParams:true});

const React = require('react');

import {MenuViewController,NewsViewController} from '../controller/view/'

router.get('/index', MenuViewController.getMenuView);
router.get('/', MenuViewController.getMenuView);

router.get('/menu/:menuId/menuType/:menuType/page/:page/size/:size/news', NewsViewController.getNewsView);
router.get('/news/:newsId', NewsViewController.getNewsViewDetails);
router.get('/search/:search/', NewsViewController.getNewsViewSearch);

module.exports = router