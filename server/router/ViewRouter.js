const express = require('express')
const router = express.Router({mergeParams:true});

const React = require('react');

import {MenuViewController,NewsViewController} from '../controller/view/'

router.get('/menu', MenuViewController.getMenuView);

router.get('/menu/:menuId/news', NewsViewController.getNewsView);
//router.get('/article/:articleId', MenuViewController.getMenuView);

module.exports = router