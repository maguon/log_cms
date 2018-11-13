"use strict"

const resUtil = require('../util/ResUtil');
const {UserModel} = require('../modules/schemas');
const LogUtil = require('../util/LogUtil');
const encrypt = require('../util/Encrypt');
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


module.exports = {
    createUser,getUser,updateUser
};