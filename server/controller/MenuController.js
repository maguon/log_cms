"use strict"

const resUtil = require('../util/ResUtil');
const {MenuModel} = require('../modules/schemas');
const {NewsModel} = require('../modules/schemas');
const LogUtil = require('../util/LogUtil');
const logger = LogUtil.createLogger('MenuController');

const  createMenu = (req, res, next) => {
    let bodyParams = req.body;
    let menuId = 0;
    new Promise((resolve) => {
        let menuObj = {
            menu_pid: bodyParams.menuPid,
            menu_name: bodyParams.menuName,
            menu_num: bodyParams.menuNum,
            menu_type: bodyParams.menuType,
            menu_status: bodyParams.menuStatus,
            menu_link: bodyParams.menuLink
        }

        let menuModel = new MenuModel(menuObj);
        menuModel.save(function(error,result){
            if(error){
                logger.error(' createMenu ' + error.message);
                reject(error)
            }else{
                menuId = result.id;
                console.log(1);
                resolve(menuId);
            }
        })
    }).then(() => {
        new Promise((resolve) => {
            if(bodyParams.menuPid!="-1"){
                let menuObj = {
                    lower_flag: 1
                }

                const query = { _id:bodyParams.menuPid };
                MenuModel.findOneAndUpdate(query,menuObj,function(error,result){
                    if(error){
                        logger.error(' updateMenu ' + error.message);
                        reject(error)
                    }else{
                        console.log(2);
                        resolve(menuId)
                    }
                })
            }else{
                console.log(3);
                resolve(menuId);
            }
        }).then((menuId) => {
            logger.info(' createMenu ' + 'success');
            resUtil.resetQueryRes(res, {menuId:menuId});
            return next();
        })
    }).catch((error)=>{
        resUtil.resInternalError(error,res);
    })
}

const getMenu = (req, res, next) => {
    let params = req.query;
    let query = MenuModel.find({}).sort( { menu_num: 1 } );

    if(params.menuId){
        query.where('_id').equals(params.menuId);
    }
    if(params.menuPid){
        query.where('menu_pid').equals(params.menuPid);
    }
    if(params.menuStatus){
        query.where('menu_status').equals(params.menuStatus);
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
            return next();
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
            return next();
        }
    })
}

const removeMenu = (req ,res ,next) => {
    let params = req.params;
    new Promise((resolve) => {
        let query = MenuModel.find({});

        if(params.menuId){
            query.where('menu_pid').equals(params.menuId);
        }
        query.exec((error,rows)=> {
            if (error) {
                logger.error(' getMenu ' + error.message);
                resUtil.resInternalError(error,res);
            } else {
                if(rows && rows.length>0){
                    logger.warn(' getMenu ' + 'failed');
                    resUtil.resetFailedRes(res," 请先删除子级栏目 ");
                    return next();
                }else{
                    resolve();
                }
            }
        });
    }).then(() => {
        new Promise((resolve) => {
            let query = NewsModel.find({});

            if(params.menuId){
                query.where('menu_id').equals(params.menuId);
            }
            query.exec((error,rows)=> {
                if (error) {
                    logger.error(' getNews ' + error.message);
                    resUtil.resInternalError(error,res);
                } else {
                    if(rows && rows.length>0){
                        logger.warn(' getNews ' + 'failed');
                        resUtil.resetFailedRes(res," 请先删除栏目下的全部内容 ");
                        return next();
                    }else{
                        resolve();
                    }
                }
            });
        }).then(() => {
            const query = { _id:params.menuId };
            MenuModel.findOneAndRemove(query,function(error,result){
                logger.debug(' removeMenu ') ;
                if (error) {
                    logger.error(' removeMenu ' + error.message);
                    resUtil.resInternalError(error,res);
                } else {
                    logger.info(' removeMenu ' + 'success');
                    resUtil.resetUpdateRes(res,result,null);
                    return next();
                }
            })
        })
    })

}


module.exports = {
    createMenu,
    getMenu,
    updateMenu,
    removeMenu
};