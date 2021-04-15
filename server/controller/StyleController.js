"use strict"

const resUtil = require('../util/ResUtil');
const {StyleModel} = require('../modules/schemas');
const LogUtil = require('../util/LogUtil');
const logger = LogUtil.createLogger('StyleController');

const  createStyle = (req, res, next) => {
    let bodyParams = req.body;
    let params = req.params;
    new Promise((resolve) => {
        let query = StyleModel.find({});
        query.exec((error,rows)=> {
            if (error) {
                logger.error(' getStyle ' + error.message);
                resUtil.resInternalError(error,res);
            } else {
                if(rows && rows.length>0){
                    resolve();
                }else{
                    let styleObj = {
                        sid: 0,
                        title: '',
                        meta:[],
                        css_link: [],
                        js_link: []
                    }
                    let styleModel = new StyleModel(styleObj)
                    styleModel.save(function(error,result){
                        if (error) {
                            logger.error(' createStyle ' + error.message);
                            resUtil.resInternalError(error,res);
                        } else {
                            logger.info(' createStyle ' + 'success');
                            resolve();
                        }
                    })

                }

            }
        });
    }).then(() => {
        let styleObj = {
            title: bodyParams.title,
            meta: bodyParams.meta,
            css_link:bodyParams.cssLink,
            js_link:bodyParams.jsLink
        };
        const query = { sid:params.sid };
        StyleModel.findOneAndUpdate(query,styleObj,function(error,result){
            logger.debug(' updateStyle ') ;
            if (error) {
                logger.error(' updateStyle ' + error.message);
                resUtil.resInternalError(error,res);
            } else {
                logger.info(' updateStyle ' + 'success');
                resUtil.resetUpdateRes(res,result,null);
                return next();
            }
        })
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
    createStyle,
    getStyle
};