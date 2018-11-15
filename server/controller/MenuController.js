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
        show_flag: bodyParams.showFlag,
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


module.exports = {
    createMenu
};