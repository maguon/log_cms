"use strict"

const resUtil = require('../util/ResUtil');
const {AdminModel} = require('../modules/schemas');
const {SysLogModel} = require('../modules/schemas');
const LogUtil = require('../util/LogUtil');
const encrypt = require('../util/Encrypt');
const sysConst = require('../util/SysConst');
const sysMsg = require('../util/SystemMsg');
const logger = LogUtil.createLogger('AdminController');

const createAdmin = (req, res, next) => {
    let bodyParams = req.body;
    let adminObj = {
        user_name:bodyParams.userName,
        password:encrypt.encryptByMd5(bodyParams.password),
        phone:bodyParams.phone,
        sex:bodyParams.sex
    };

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
};

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
};

/**
 * 系统登录页面，点击【登录】按钮，进行身份验证
 * @param req request请求
 * @param res response相应
 * @param next 跳转回调
 */
const adminLogin = (req, res, next) => {
    // 参数：用户名，密码
    let bodyParams = req.body;

    let query = AdminModel.find({});
    if(bodyParams.userName){
        query.where('user_name').equals(bodyParams.userName);
    }
    query.where('type').equals(sysConst.USER_TYPE.admin).exec().then((rows)=> {
        if(rows && rows.length<1){
            // 用户不存在
            logger.warn(' adminLogin ' + sysMsg.ADMIN_LOGIN_USER_UNREGISTERED);
            resUtil.resetFailedRes(res,sysMsg.ADMIN_LOGIN_USER_UNREGISTERED);
        }else{
            // 密码验证
            let passwordMd5 = encrypt.encryptByMd5(bodyParams.password);
            if(passwordMd5 != rows[0].password){
                // 登录密码错误
                logger.warn(' adminLogin ' + sysMsg.CUST_LOGIN_PSWD_ERROR);
                resUtil.resetFailedRes(res,sysMsg.CUST_LOGIN_PSWD_ERROR) ;
            }else{
                // 用户信息
                let user = {
                    userId : rows[0]._id,
                    phone : rows[0].phone,
                    type : rows[0].type,
                    userStatus : rows[0].status
                };
                // 用户状态 判定
                if(rows[0].status == sysConst.USER_STATUS.not_active){
                    logger.info('adminLogin' + " not verified");
                    resUtil.resetQueryRes(res,user,null);
                }
                return user;
            }
        }
    }).then(user => {
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
        };

        let sysLogModel = new SysLogModel(sysLogObj);
        // 写入log日志
        sysLogModel.save(function(error,result){
            if (error) {
                logger.error(' createSysLog ' + error.message);
                resUtil.resInternalError(error,res);
            } else {
                logger.info(' createSysLog ' + 'success');
                resUtil.resetQueryRes(res,user,null);
            }
        })
    })
};

module.exports = {
    createAdmin,
    getAdmin,
    adminLogin
};