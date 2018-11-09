"use strict"

const resUtil = require('../util/ResUtil');
const {ContentModel} = require('../modules/schemas');
const LogUtil = require('../util/LogUtil');
const logger = LogUtil.createLogger('ContentController');



const getContent = (req, res, next) => {
    let params = req.query;
    let query = ContentModel.find({});

    if(params.id){
        query.where('_id').equals(params.id);
    }
    if(params.start && params.size){
        query.skip(parseInt(params.start)).limit(parseInt(params.size));
    }
    query.exec((error,rows)=> {
        if (error) {
            logger.error(' getContent ' + error.message);
            resUtil.resInternalError(error,res);
        } else {
            logger.info(' getContent ' + 'success');
            resUtil.resetQueryRes(res, rows);
        }
    });
}
const  createContent = (req, res, next) => {
    let bodyParams = req.body;
    let contentObj = {
        text: bodyParams.text
    }

    let contentModel = new ContentModel(contentObj)
    contentModel.save(function(error,result){
        if (error) {
            logger.error(' createContent ' + error.message);
            resUtil.resInternalError(error,res);
        } else {
            logger.info(' createContent ' + 'success');
            resUtil.resetCreateRes(res, result);
        }
    })
}

const updateContent = (req, res, next) => {
    let bodyParams = req.body;
    let params = req.params;
    let contentObj = {
        text: bodyParams.text
    }

    const query = { _id:params.contentId };
    ContentModel.findOneAndUpdate(query,contentObj,function(error,result){

        logger.debug(' updateContent ') ;
        if (error) {
            logger.error(' updateContent ' + error.message);
            resUtil.resInternalError(error,res);
        } else {
            logger.info(' updateContent ' + 'success');
            resUtil.resetQueryRes(res, result);
        }
    })
}

const removeContent = (req ,res ,next) => {
    let params = req.params;
    const query = { _id:params.contentId };
    ContentModel.findOneAndRemove(query,function(error,result){
        logger.debug(' removeContent ') ;
        if (error) {
            logger.error(' removeContent ' + error.message);
            resUtil.resInternalError(error,res);
        } else {
            logger.info(' removeContent ' + 'success');
            resUtil.resetQueryRes(res, result);
        }
    })
}


module.exports = {
    getContent ,createContent,updateContent ,removeContent
};