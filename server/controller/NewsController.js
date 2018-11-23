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
            return next();
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
    if(params.newsStatus){
        query.where('news_status').equals(params.newsStatus);
    }
    if(params.createDateStart){
        query.where('created_at').gte(params.createDateStart+' 00:00:00');
    }
    if(params.createDateEnd){
        query.where('created_at').lte(params.createDateEnd+' 23:59:59');
    }
    if(params.newsTitle){
        query.where('news_title').regex(params.newsTitle);
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
            return next();
        }
    });
}

const updateNews = (req, res, next) => {
    let bodyParams = req.body;
    let params = req.params;
    let newsObj = {
        news_title: bodyParams.newsTitle,
        news_content: bodyParams.newsContent,
        roll_flag: bodyParams.rollFlag,
        news_status: bodyParams.newsStatus
    }

    const query = { _id:params.newsId };
    NewsModel.findOneAndUpdate(query,newsObj,function(error,result){
        logger.debug(' updateNews ') ;
        if (error) {
            logger.error(' updateNews ' + error.message);
            resUtil.resInternalError(error,res);
        } else {
            logger.info(' updateNews ' + 'success');
            resUtil.resetUpdateRes(res,result,null);
            return next();
        }
    })
}

const removeNews = (req ,res ,next) => {
    let params = req.params;
    const query = { _id:params.newsId };
    NewsModel.findOneAndRemove(query,function(error,result){
        logger.debug(' removeNews ') ;
        if (error) {
            logger.error(' removeNews ' + error.message);
            resUtil.resInternalError(error,res);
        } else {
            logger.info(' removeNews ' + 'success');
            resUtil.resetUpdateRes(res,result,null);
            return next();
        }
    })
}


module.exports = {
    createNews,
    getNews,
    updateNews,
    removeNews
};