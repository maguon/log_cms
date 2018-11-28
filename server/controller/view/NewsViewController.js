'use strict'

const React = require('react');
const ReactDOMServer = require('react-dom/server');
const resUtil = require('../../util/ResUtil');

const {NewsModel} = require('../../modules/schemas');
const {MenuModel} = require('../../modules/schemas');
import NewsComponent from '../../../client/components/NewsComponent';

const getNewsView = (req ,res ,next) => {
    let params = req.params;
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
    }).then((menu) => {
        let query = NewsModel.find({});
        if(params.newsId){
            query.where('_id').equals(params.newsId);
        }
        if(params.menuId){
            query.where('menu_id').equals(params.menuId);
        }
        query.exec((error,rows)=> {
            if(error){
                resUtil.resetErrorPage(res,error);
            }else{
                const componentString = ReactDOMServer.renderToString( <NewsComponent {... {newsList:rows,menuList:menu}}/>);
                resUtil.resetMainPage(res,'news',componentString)
            }

        });
    })

}


module.exports = {
    getNewsView
}