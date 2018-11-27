'use strict'
const React = require('react');
const ReactDOMServer = require('react-dom/server');
const resUtil = require('../../util/ResUtil');

const {MenuModel} = require('../../modules/schemas');
import Header from '../../../client/components/layout/Header';

const getMenuView = (req, res, next) => {
    let query = MenuModel.find({});
    query.where('menu_pid').equals('-1');
    query.where('menu_status').equals('1');
    query.sort('menu_num').exec((error,rows)=> {
        if(error){
            resUtil.resetErrorPage(res,error);
        }else{
            const componentString = ReactDOMServer.renderToString( <Header {... {menuList:rows}}/>);
            resUtil.resetMainPage(res,'Menu',componentString)
        }

    });
};

module.exports = {
    getMenuView
}