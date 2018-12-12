"use strict"

const resUtil = require('../util/ResUtil');
const {SysLogModel} = require('../modules/schemas');
const LogUtil = require('../util/LogUtil');
const logger = LogUtil.createLogger('SysLogController');

const getSysLog = (req, res, next) => {
    let params = req.query;
    let query = SysLogModel.find({}).populate('admin_id',{password:0});
    if(params.ip){
        query.where('ip').equals(params.ip);
    }
    if(params.createDateStart){
        query.where('created_at').gte(params.createDateStart+' 00:00:00');
    }
    if(params.createDateEnd){
        query.where('created_at').lte(params.createDateEnd+' 23:59:59');
    }
    if(params.start && params.size){
        query.skip(parseInt(params.start)).limit(parseInt(params.size));
    }
    query.sort({'_id':-1}).exec((error,rows)=> {
        if (error) {
            logger.error(' getSysLog ' + error.message);
            resUtil.resInternalError(error,res);
        } else {
            logger.info(' getSysLog ' + 'success');
            resUtil.resetQueryRes(res, rows);
            return next();
        }
    });
}


module.exports = {
    getSysLog
};