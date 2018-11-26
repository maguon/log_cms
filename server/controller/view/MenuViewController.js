'use strict'
const React = require('react');
const ReactDOMServer = require('react-dom/server');
const resUtil = require('../../util/ResUtil');

const {MenuModel} = require('../../modules/schemas');
import MenuComponent from '../../../client/components/MenuComponent';

const getMenuView = (req, res, next) => {
    let query = MenuModel.find({});
    query.sort('order').exec((error,rows)=> {
        if(error){
            resUtil.resetErrorPage(res,error);
        }else{
            const componentString = ReactDOMServer.renderToString( <MenuComponent {... {menuList:rows}}/>);
            resUtil.resetMainPage(res,'Menu',componentString)
        }

    });
};

module.exports = {
    getMenuView
}