const express = require('express')
const router = express.Router({mergeParams:true});

const React = require('react');

import {MenuViewController} from '../controller/view/'

router.get('/menu', MenuViewController.getMenuView);

module.exports = router