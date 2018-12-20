"use strict"

const resUtil = require('../util/ResUtil');
const {AdminModel} = require('../modules/schemas');
const {SysLogModel} = require('../modules/schemas');
const LogUtil = require('../util/LogUtil');
const encrypt = require('../util/Encrypt');
const sysConst = require('../util/SysConst');
const sysMsg = require('../util/SystemMsg');
const oAuthUtil = require('../util/OAuthUtil');
const logger = LogUtil.createLogger('AdminController');

const createAdmin = (req, res, next) => {
    let bodyParams = req.body;
    let adminObj = {
        user_name:bodyParams.userName,
        password:encrypt.encryptByMd5(bodyParams.password),
        phone:bodyParams.phone,
        sex:bodyParams.sex
    }

    let adminModel = new AdminModel(adminObj);
    adminModel.save(function(error,result){
        if (error) {
            logger.error(' createAdmin ' + error.message);
            resUtil.resInternalError(error,res);
        } else {
            logger.info(' createAdmin ' + 'success');
            resUtil.resetCreateRes(res, result);
            return next();
        }
    })
}

const getAdmin = (req, res, next) => {
    let params = req.params;
    let query = AdminModel.find({},{password:0});

    if(params.adminId){
        query.where('_id').equals(params.adminId);
    }
    query.exec((error,rows)=> {
        if (error) {
            logger.error(' getAdmin ' + error.message);
            resUtil.resInternalError(error,res);
        } else {
            logger.info(' getAdmin ' + 'success');
            resUtil.resetQueryRes(res, rows);
            return next();
        }
    });
}

const adminLogin = (req, res, next) => {
    let bodyParams = req.body;
    new Promise((resolve) => {
        let query = AdminModel.find({});

        if(bodyParams.userName){
            query.where('user_name').equals(bodyParams.userName);
        }
        query.where('type').equals(sysConst.USER_TYPE.admin);
        query.exec((error,rows)=> {
            if (error) {
                logger.error(' getAdmin ' + error.message);
                resUtil.resInternalError(error,res);
            } else {
                if(rows && rows.length<1){
                    logger.warn(' adminLogin ' + sysMsg.ADMIN_LOGIN_USER_UNREGISTERED);
                    resUtil.resetFailedRes(res,sysMsg.ADMIN_LOGIN_USER_UNREGISTERED);
                    return next();
                }else{
                    let passwordMd5 = encrypt.encryptByMd5(bodyParams.password);
                    if(passwordMd5 != rows[0].password){
                        logger.warn(' adminLogin ' + sysMsg.CUST_LOGIN_PSWD_ERROR);
                        resUtil.resetFailedRes(res,sysMsg.CUST_LOGIN_PSWD_ERROR) ;
                        return next();

                    }else{
                        let user = {
                            userId : rows[0]._id,
                            phone : rows[0].phone,
                            type : rows[0].type,
                            userStatus : rows[0].status
                        }
                        if(rows[0].status == sysConst.USER_STATUS.not_active){
                            //Admin User status is not verified return user id

                            logger.info('adminLogin' + " not verified");
                            resUtil.resetQueryRes(res,user,null);
                            return next();
                        }else{
                            //admin user status is active,return token

                            //user.accessToken = oAuthUtil.createAccessToken(oAuthUtil.clientType.admin,user.userId,user.userStatus);
                            oAuthUtil.saveToken(user,function(error,result){
                                if(error){
                                    logger.error(' adminLogin ' + error.stack);
                                    return next();
                                }else{
                                    logger.info('adminLogin' + " success");
                                    //resUtil.resetQueryRes(res,user,null);
                                    //return next();
                                    resolve(user);
                                }
                            })

                        }
                    }
                }
            }
        });
    }).then((user) => {
        let getClientIp = function (req) {
            return req.headers['x-forwarded-for'] ||
                req.connection.remoteAddress ||
                req.socket.remoteAddress ||
                req.connection.socket.remoteAddress || '';
        };
        let ip = getClientIp(req).match(/\d+.\d+.\d+.\d+/);
        ip = ip ? ip.join('.') : null;
        let sysLogObj = {
            admin_id:user.userId,
            ip:ip,
            type:1
        }

        let sysLogModel = new SysLogModel(sysLogObj);
        sysLogModel.save(function(error,result){
            if (error) {
                logger.error(' createSysLog ' + error.message);
                resUtil.resInternalError(error,res);
            } else {
                logger.info(' createSysLog ' + 'success');
                resUtil.resetQueryRes(res,user,null);
                return next();
            }
        })
    })

}


module.exports = {
    createAdmin,
    getAdmin,
    adminLogin
};