const mongodbConfig = {
    connect : 'mongodb://192.168.191.138:27017/mingyuan_cms',
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

const record = {
    path : "/view/mingyuan"
}


module.exports = {
    mongodbConfig  ,logConfig ,record
}