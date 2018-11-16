"use strict"

const resUtil = require('../util/ResUtil');
const {NewsModel} = require('../modules/schemas');
const LogUtil = require('../util/LogUtil');
const logger = LogUtil.createLogger('NewsController');

const  createNews = (req, res, next) => {
    let bodyParams = req.body;
    let params = req.params;
    let newsObj = {
        menu_id: params.menuId,
        news_title: bodyParams.newsTitle,
        news_content: bodyParams.newsContent,
        roll_flag: bodyParams.rollFlag,
        news_status: bodyParams.newsStatus
    }

    let newsModel = new NewsModel(newsObj)
    newsModel.save(function(error,result){
        if (error) {
            logger.error(' createNews ' + error.message);
            resUtil.resInternalError(error,res);
        } else {
            logger.info(' createNews ' + 'success');
            resUtil.resetCreateRes(res, result);
        }
    })
}

const getNews = (req, res, next) => {
    let params = req.query;
    let query = NewsModel.find({});

    if(params.newsId){
        query.where('_id').equals(params.newsId);
    }
    if(params.menuId){
        query.where('menu_id').equals(params.menuId);
    }
    if(params.start && params.size){
        query.skip(parseInt(params.start)).limit(parseInt(params.size));
    }
    query.exec((error,rows)=> {
        if (error) {
            logger.error(' getNews ' + error.message);
            resUtil.resInternalError(error,res);
        } else {
            logger.info(' getNews ' + 'success');
            resUtil.resetQueryRes(res, rows);
        }
    });
}


module.exports = {
    createNews,getNews
};