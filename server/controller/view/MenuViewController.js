'use strict'

const React = require('react');
const ReactDOMServer = require('react-dom/server');
const resUtil = require('../../util/ResUtil');

const {MenuModel} = require('../../modules/schemas');
const {NewsModel} = require('../../modules/schemas');
import MenuComponent from '../../../client/components/MenuComponent';

const getMenuView = (req, res, next) => {
    new Promise((resolve) => {
        let query = MenuModel.find({});
        query.where('menu_pid').equals('-1');
        query.where('menu_status').equals('1');
        query.sort('menu_num').exec((error,rows)=> {
            if(error){
                resUtil.resetErrorPage(res,error);
            }else{
                resolve(rows);
            }
        });
    }).then((menuList) => {
        let query = NewsModel.find({});
        query.where('roll_flag').equals('1');
        query.where('news_status').equals('1');
        query.sort({'_id':-1}).exec((error,rows)=> {
            if(error){
                resUtil.resetErrorPage(res,error);
            }else{
                const componentString = ReactDOMServer.renderToString( <MenuComponent {... {menuList:menuList,newsList:rows}}/>);
                resUtil.resetMainPage(res,'Menu',componentString)
            }
        })
    })
}

module.exports = {
    getMenuView
}