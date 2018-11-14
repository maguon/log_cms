"use strict"

const resUtil = require('../util/ResUtil');
const {UserModel} = require('../modules/schemas');
const LogUtil = require('../util/LogUtil');
const encrypt = require('../util/Encrypt');
const sysConst = require('../util/SysConst');
const sysMsg = require('../util/SystemMsg');
const oAuthUtil = require('../util/OAuthUtil');
const logger = LogUtil.createLogger('UserController');

const createUser = (req, res, next) => {
    let bodyParams = req.body;
    let userObj = {
        user_name:bodyParams.userName,
        password:encrypt.encryptByMd5(bodyParams.password),
        phone:bodyParams.phone,
        sex:bodyParams.sex,
        type:bodyParams.type
    }

    let userModel = new UserModel(userObj);
    userModel.save(function(error,result){
        if (error) {
            logger.error(' createUser ' + error.message);
            resUtil.resInternalError(error,res);
        } else {
            logger.info(' createUser ' + 'success');
            resUtil.resetCreateRes(res, result);
        }
    })
}

const getUser = (req, res, next) => {
    let params = req.query;
    let query = UserModel.find({},{password:0});

    if(params.userId){
        query.where('_id').equals(params.userId);
    }
    if(params.start && params.size){
        query.skip(parseInt(params.start)).limit(parseInt(params.size));
    }
    query.exec((error,rows)=> {
        if (error) {
            logger.error(' getUser ' + error.message);
            resUtil.resInternalError(error,res);
        } else {
            logger.info(' getUser ' + 'success');
            resUtil.resetQueryRes(res, rows);
        }
    });
}

const getUserBase = (req, res, next) => {
    let params = req.params;
    let query = UserModel.find({},{password:0});

    if(params.userId){
        query.where('_id').equals(params.userId);
    }
    query.exec((error,rows)=> {
        if (error) {
            logger.error(' getUserBase ' + error.message);
            resUtil.resInternalError(error,res);
        } else {
            logger.info(' getUserBase ' + 'success');
            resUtil.resetQueryRes(res, rows);
        }
    });
}

const userLogin = (req, res, next) => {
    let bodyParams = req.body;
    let query = UserModel.find({});

    if(bodyParams.userName){
        query.where('user_name').equals(bodyParams.userName);
    }
    query.exec((error,rows)=> {
        if (error) {
            logger.error(' getUser ' + error.message);
            resUtil.resInternalError(error,res);
        } else {
            if(rows && rows.length<1){
                logger.warn(' userLogin ' + sysMsg.ADMIN_LOGIN_USER_UNREGISTERED);
                resUtil.resetFailedRes(res,sysMsg.ADMIN_LOGIN_USER_UNREGISTERED);
                return next();
            }else{
                let passwordMd5 = encrypt.encryptByMd5(bodyParams.password);
                if(passwordMd5 != rows[0].password){
                    logger.warn(' userLogin ' + sysMsg.CUST_LOGIN_PSWD_ERROR);
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

                        logger.info('userLogin' + " not actived");
                        resUtil.resetFailedRes(res,sysMsg.SYS_AUTH_TOKEN_ERROR);
                        return next();
                    }else{
                        //admin user status is active,return token

                        user.accessToken = oAuthUtil.createAccessToken(oAuthUtil.clientType.user,user.userId,user.userStatus);
                        oAuthUtil.saveToken(user,function(error,result){
                            if(error){
                                logger.error(' userLogin ' + error.stack);
                                return next();
                            }else{
                                logger.info('userLogin' + " success");
                                resUtil.resetQueryRes(res,user,null);
                                return next();
                            }
                        })

                    }
                }
            }
        }
    });
}

const updateUser = (req, res, next) => {
    let bodyParams = req.body;
    let params = req.params;
    let userObj = {
        user_name:bodyParams.userName,
        password:bodyParams.password,
        phone:bodyParams.phone,
        sex:bodyParams.sex,
        type:bodyParams.type
    }

    const query = { _id:params.userId };
    UserModel.findOneAndUpdate(query,userObj,function(error,result){
        logger.debug(' updateUser ') ;
        if (error) {
            logger.error(' updateUser ' + error.message);
            resUtil.resInternalError(error,res);
        } else {
            logger.info(' updateUser ' + 'success');
            resUtil.resetQueryRes(res, result);
        }
    })
}

const updateUserStatus = (req, res, next) => {
    let params = req.params;
    let userObj = {
        status:params.status
    }

    const query = { _id:params.userId };
    UserModel.findOneAndUpdate(query,userObj,function(error,result){
        logger.debug(' updateUserStatus ') ;
        if (error) {
            logger.error(' updateUserStatus ' + error.message);
            resUtil.resInternalError(error,res);
        } else {
            logger.info(' updateUserStatus ' + 'success');
            resUtil.resetQueryRes(res, result);
        }
    })
}


module.exports = {
    createUser,
    getUser,
    getUserBase,
    userLogin,
    updateUser,
    updateUserStatus
};