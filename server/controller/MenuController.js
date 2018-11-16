"use strict"

const resUtil = require('../util/ResUtil');
const {MenuModel} = require('../modules/schemas');
const LogUtil = require('../util/LogUtil');
const logger = LogUtil.createLogger('MenuController');

const  createMenu = (req, res, next) => {
    let bodyParams = req.body;
    let menuObj = {
        menu_pid: bodyParams.menuPid,
        menu_name: bodyParams.menuName,
        menu_level: bodyParams.menuLevel,
        menu_num: bodyParams.menuNum,
        menu_status: bodyParams.menuStatus,
        menu_link: bodyParams.menuLink
    }

    let menuModel = new MenuModel(menuObj)
    menuModel.save(function(error,result){
        if (error) {
            logger.error(' createMenu ' + error.message);
            resUtil.resInternalError(error,res);
        } else {
            logger.info(' createMenu ' + 'success');
            resUtil.resetCreateRes(res, result);
        }
    })
}

const getMenu = (req, res, next) => {
    let params = req.query;
    let query = MenuModel.find({});

    if(params.menuId){
        query.where('_id').equals(params.menuId);
    }
    if(params.start && params.size){
        query.skip(parseInt(params.start)).limit(parseInt(params.size));
    }
    query.exec((error,rows)=> {
        if (error) {
            logger.error(' getMenu ' + error.message);
            resUtil.resInternalError(error,res);
        } else {
            logger.info(' getMenu ' + 'success');
            resUtil.resetQueryRes(res, rows);
        }
    });
}

const updateMenu = (req, res, next) => {
    let bodyParams = req.body;
    let params = req.params;
    let menuObj = {
        menu_pid: bodyParams.menuPid,
        menu_name: bodyParams.menuName,
        menu_num: bodyParams.menuNum,
        menu_status: bodyParams.menuStatus
    }

    const query = { _id:params.menuId };
    MenuModel.findOneAndUpdate(query,menuObj,function(error,result){
        logger.debug(' updateMenu ') ;
        if (error) {
            logger.error(' updateMenu ' + error.message);
            resUtil.resInternalError(error,res);
        } else {
            logger.info(' updateMenu ' + 'success');
            resUtil.resetUpdateRes(res,result,null);
        }
    })
}


module.exports = {
    createMenu,getMenu,updateMenu
};