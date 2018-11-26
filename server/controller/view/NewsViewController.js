'use strict'
const React = require('react');
const ReactDOMServer = require('react-dom/server');
const resUtil = require('../../util/ResUtil');

const {NewsModel} = require('../../modules/schemas');
import NewsComponent from '../../../client/components/NewsComponent';

const getNewsView = (req, res, next) => {
    let params = req.params;
    let query = NewsModel.find({});
    if(params.menuId){
        query.where('menu_id').equals(params.menuId);
    }
    query.exec((error,rows)=> {
        if(error){
            resUtil.resetErrorPage(res,error);
        }else{
            const componentString = ReactDOMServer.renderToString( <NewsComponent {... {newsList:rows}}/>);
            resUtil.resetNewsPage(res,'news',componentString)
        }

    });
};

module.exports = {
    getNewsView
}