"use strict"

const resUtil = require('../util/ResUtil');
const {LayoutModel} = require('../modules/schemas');
const LogUtil = require('../util/LogUtil');
const logger = LogUtil.createLogger('StyleController');

const  createLayout = (req, res, next) => {
    let bodyParams = req.body;
    let hasOne = false;

    LayoutModel.find({}).exec().then(async (rows)=>{
        // 查询layout表
        if(rows && rows.length > 0){
            // 有数据，则下一步 进行更新
            hasOne = true;
        } else {
            // 没有数据时，创建默认数据
            let dataObj = {
                multi_menu: 0,
                carousel: '',
                content: []
            };
            let layoutModel = new LayoutModel(dataObj);
            await layoutModel.save(function(error, result){
                if (error) {
                    logger.error(' createLayout ' + error.message);
                    resUtil.resInternalError(error,res);
                } else {
                    hasOne = true;
                    logger.info(' createLayout ' + 'success');
                }
            })
        }
    }).then(() => {
        if (hasOne) {
            // 接收的数据
            let dataObj = {
                multi_menu: bodyParams.multiMenu,
                carousel: bodyParams.carousel,
                content: bodyParams.content
            };

            // 查询条件
            const query = {};
            // 查询并修改
            LayoutModel.findOneAndUpdate(query,dataObj,function(error,result){
                logger.debug(' updateLayout ');
                if (error) {
                    logger.error(' updateLayout ' + error.message);
                    resUtil.resInternalError(error,res);
                } else {
                    logger.info(' updateLayout ' + 'success');
                    resUtil.resetUpdateRes(res,result,null);
                    return next();
                }
            })
        }
    }).catch(error=>{
        logger.error(' createLayout ' + error.message);
        resUtil.resetErrorPage(res,error);
    })
};

const getLayout = (req, res, next) => {
    let params = req.query;
    let query = LayoutModel.find({});

    if(params.layoutId){
        query.where('_id').equals(params.layoutId);
    }
    query.exec((error,rows)=> {
        if (error) {
            logger.error(' getLayout ' + error.message);
            resUtil.resInternalError(error,res);
        } else {
            logger.info(' getLayout ' + 'success');
            resUtil.resetQueryRes(res, rows);
            return next();
        }
    });
};

module.exports = {
    createLayout,
    getLayout
};