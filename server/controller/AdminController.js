"use strict"

const resUtil = require('../util/ResUtil');
const {AdminModel} = require('../modules/schemas');
const LogUtil = require('../util/LogUtil');
const encrypt = require('../util/Encrypt');
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
        }
    });
}


module.exports = {
    createAdmin,getAdmin
};