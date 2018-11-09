'use strict'

const systemConfig = require('../config/SystemConfig.js');
const log4js = require('log4js');

const createLogger = (name)=>{
    log4js.configure(systemConfig.logConfig);
    return log4js.getLogger(name);
}

module.exports ={
    createLogger
}