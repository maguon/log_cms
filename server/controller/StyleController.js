"use strict"

const resUtil = require('../util/ResUtil');
const {StyleModel} = require('../modules/schemas');
const LogUtil = require('../util/LogUtil');
const logger = LogUtil.createLogger('StyleController');

const  createCssLink = (req, res, next) => {
    let bodyParams = req.body;
    let cssLinkObj = {
        $push: { css_link: {cssLink:bodyParams.cssLink} }
    }
    StyleModel.findOneAndUpdate(null,cssLinkObj,{upsert:true},function(error,result){
        logger.debug(' createCssLink ') ;
        if (error) {
            logger.error(' createCssLink ' + error.message);
            resUtil.resInternalError(error,res);
        } else {
            logger.info(' createCssLink ' + 'success');
            resUtil.resetUpdateRes(res,result,null);
            return next();
        }
    })
}

const  createJsLink = (req, res, next) => {
    let bodyParams = req.body;
    let jsLinkObj = {
        $push: { js_link: {jsLink:bodyParams.jsLink} }
    }
    StyleModel.findOneAndUpdate(null,jsLinkObj,{upsert:true},function(error,result){
        logger.debug(' createJsLink ') ;
        if (error) {
            logger.error(' createJsLink ' + error.message);
            resUtil.resInternalError(error,res);
        } else {
            logger.info(' createJsLink ' + 'success');
            resUtil.resetUpdateRes(res,result,null);
            return next();
        }
    })
}

const getStyle = (req, res, next) => {
    let params = req.query;
    let query = StyleModel.find({});

    if(params.styleId){
        query.where('_id').equals(params.styleId);
    }
    query.exec((error,rows)=> {
        if (error) {
            logger.error(' getStyle ' + error.message);
            resUtil.resInternalError(error,res);
        } else {
            logger.info(' getStyle ' + 'success');
            resUtil.resetQueryRes(res, rows);
            return next();
        }
    });
}


module.exports = {
    createCssLink,
    createJsLink,
    getStyle
};