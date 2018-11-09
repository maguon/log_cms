'usestrict'
const mongoose = require('mongoose');
const sysConfig = require('../../config/SystemConfig');
const LogUtil = require('../../util/LogUtil');
const logger = LogUtil.createLogger('MongoCon');




try{
    mongoose.connect(sysConfig.mongodbConfig.connect);
    logger.info('Connect Mongodb Success');
}catch(err){
    logger.error('Connect mongodb error :' +err.stack)
}

const getMongo = ()=>{
    return mongoose ;
}

module.exports = {
    getMongo: getMongo
};

