"use strict"

const resUtil = require('../util/ResUtil');
const {MenuTreeModel} = require('../modules/schemas');
const LogUtil = require('../util/LogUtil');
const logger = LogUtil.createLogger('MenuTreeController');

const createMenuTree = (req, res, next) => {
    let bodyParams = req.body;
    let params = req.params;
    let hasOne = false;

    MenuTreeModel.find({}).exec().then(async (rows)=>{
        // 查询
        if(rows && rows.length > 0){
            // 有数据，则下一步 进行更新
            hasOne = true;
        } else {
            // 没有数据时，创建默认数据
            let dataObj = {menu_tree: []};

            let menuTreeModel = new MenuTreeModel(dataObj);
            await menuTreeModel.save(function(error,result){
                if (error) {
                    logger.error(' createMenuTree ' + error.message);
                    resUtil.resInternalError(error,res);
                } else {
                    hasOne = true;
                    logger.info(' createMenuTree ' + 'success');
                }
            });
        }
    }).then(() => {
        if (hasOne) {
            // 接收的数据
            let dataObj = {
                menu_tree: bodyParams.menuTree
            };

            // 查询条件
            MenuTreeModel.findOneAndUpdate({},dataObj,function(error,result){
                logger.debug(' updateMenuTree ') ;
                if (error) {
                    logger.error(' updateMenuTree ' + error.message);
                    resUtil.resInternalError(error,res);
                } else {
                    logger.info(' updateMenuTree ' + 'success');
                    resUtil.resetUpdateRes(res,result,null);
                    return next();
                }
            })
        }
    }).catch(error=>{
        logger.error(' createMenuTree ' + error.message);
        resUtil.resetErrorPage(res,error);
    })
};

const getMenuTree = (req, res, next) => {
    MenuTreeModel.find({}).exec((error,rows)=> {
        if (error) {
            logger.error(' getMenuTree ' + error.message);
            resUtil.resInternalError(error,res);
        } else {
            logger.info(' getMenuTree ' + 'success');
            resUtil.resetQueryRes(res, rows);
            return next();
        }
    });
};

module.exports = {
    createMenuTree,
    getMenuTree
};