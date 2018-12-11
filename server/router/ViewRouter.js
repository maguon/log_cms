const express = require('express')
const router = express.Router({mergeParams:true});

const React = require('react');

import {MenuViewController,NewsViewController} from '../controller/view/'

router.get('/index', MenuViewController.getMenuView);
router.get('/', MenuViewController.getMenuView);

router.get('/menu/:menuId/menuType/:menuType/page/:page/news', NewsViewController.getNewsView);
router.get('/menu/:menuId/menuType/:menuType/news/:newsId/page/:page', NewsViewController.getNewsViewDetails);
router.get('/menu/:menuId/menuType/:menuType/page/:page/newsListDetails', NewsViewController.getNewsViewDetails);
router.get('/menu/:menuId/menuType/:menuType/picture/:pictureId/page/:page', NewsViewController.getPictureDetails);
router.get('/menu/:menuId/menuType/:menuType/page/:page/pictureDetails', NewsViewController.getPictureDetails);
router.get('/search/:search/', NewsViewController.getNewsViewSearch);

module.exports = router