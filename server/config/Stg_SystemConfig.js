const mongodbConfig = {
    connect : 'mongodb://192.168.191.141:27017/log_cms',
    debug : true
}

const logConfig = {
    appenders: {
        //error logs write by hours
        errorLogger: {
            "type": "file",
            "filename": 'error.log',
            "pattern": "-yyyy-MM-dd.log",
            "path": './log',   //root path,
            "alwaysIncludePattern": true
        },
        devLogger: {
            "type": "console",
            "filename": 'debug.log',
            "path": './log',
            "alwaysIncludePattern": true,
            "pattern": "-yyyy-MM-dd.log"
        }
    },
    categories: {
        errorLogger: {
            appenders: ["errorLogger"],
            level: "ERROR"
        },
        devLogger: {
            appenders: ["devLogger"],
            level: "DEBUG"
        },
        default: {
            appenders: ["devLogger"],
            level: "DEBUG"
        },
    }
}
module.exports = {
    mongodbConfig  ,logConfig
}