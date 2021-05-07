"use strict"

const resUtil = require('../util/ResUtil');
const {StyleModel} = require('../modules/schemas');
const LogUtil = require('../util/LogUtil');
const logger = LogUtil.createLogger('StyleController');

const  createStyle = (req, res, next) => {
    let bodyParams = req.body;
    let params = req.params;
    let hasOne = false;

    StyleModel.find({}).exec().then(async (rows)=>{
        // 查询
        if(rows && rows.length > 0){
            // 有数据，则下一步 进行更新
            hasOne = true;
        } else {
            // 没有数据时，创建默认数据
            let dataObj = {
                sid: 0,
                title: '',
                logo_title:'',
                page_footer:'',
                meta:[],
                css_link: [],
                js_link: [],
                script_text: ''
            };

            let styleModel = new StyleModel(dataObj);
            await styleModel.save(function(error,result){
                if (error) {
                    logger.error(' createStyle ' + error.message);
                    resUtil.resInternalError(error,res);
                } else {
                    hasOne = true;
                    logger.info(' createStyle ' + 'success');
                }
            });
        }
        return hasOne;
    }).then((hasOne) => {
        if (hasOne) {
            // 接收的数据
            let dataObj = {
                title: bodyParams.title,
                logo_title: bodyParams.logoTitle,
                page_footer: bodyParams.pageFooter,
                meta: bodyParams.meta,
                css_link:bodyParams.cssLink,
                js_link:bodyParams.jsLink,
                script_text:bodyParams.scriptText
            };

            // 查询条件
            const query = { sid:params.sid };
            StyleModel.findOneAndUpdate(query,dataObj,function(error,result){
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
        }
    }).catch(error=>{
        logger.error(' createStyle ' + error.message);
        resUtil.resetErrorPage(res,error);
    })
};

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
};

module.exports = {
    createStyle,
    getStyle
};