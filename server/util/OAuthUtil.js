"use strict"

let serializer = require('serializer');
//let serverLogger = require('./ServerLogger.js');
let LogUtil = require('../util/LogUtil');
let logger = LogUtil.createLogger('OAuthUtil');
//let logger = serverLogger.createLogger('OAuthUtil.js');
let httpUtil = require('./HttpUtil');
let systemConfig = require('../config/SystemConfig');
//let userDao = require('../dao/UserDAO.js')
let options ={
    crypt_key: 'mp',
    sign_key: 'bizwise'
};



let clientType = {
    temp : 'temp',
    user : 'user' ,
    admin : 'admin'
};



let clientId ="mp";

let headerTokenMeta = "auth-token";

//The expired time 30 days
let expiredTime = 30*24*60*60*1000;
serializer = serializer.createSecureSerializer(options.crypt_key, options.sign_key);



const _extend = (dst,src)=>{

    let srcs = [];
    if ( typeof(src) == 'object' ) {
        srcs.push(src);
    } else if ( typeof(src) == 'array' ) {
        for (let i = src.length - 1; i >= 0; i--) {
            srcs.push(this._extend({},src[i]))
        };
    } else {
        throw new Error("Invalid argument")
    }

    for (let i = srcs.length - 1; i >= 0; i--) {
        for (let key in srcs[i]) {
            dst[key] = srcs[i][key];
        }
    };

    return dst;
}




const createAccessToken = (clientType,userId ,status)=>{
    let out ;
    out = _extend({}, {
        access_token: serializer.stringify([clientType,  userId ,+new Date,status ]),
        refresh_token: null
    });
   /* userDao.updateUserLoginDate({userId:userId},function(error,result){
        if (error) {
            logger.error(' createAccessToken  updateUserLoginDate ' + error.message);
        } else {
            logger.info(' createAccessToken  updateUserLoginDate ' + result.affectedRows>0);
        }
    });*/
    return out.access_token;
}



const parseAccessToken = (accessToken)=>{
    try{
        let data = serializer.parse(accessToken);
        let tokenInfo ={};
        tokenInfo.clientType = data[0];
        tokenInfo.userId = data[1];
        tokenInfo.grantDate = data[2];
        tokenInfo.status = data[3];
        return tokenInfo;
    }catch(e){
        logger.error(' parseNewAccessToken :'+ e.message);
        return null;
    }
}


const parseUserToken = (req)=>{
    //let cookiesToken = getCookie(req.headers.cookie,cookieTruckMeta);
    let cookiesToken = req.headers[headerTokenMeta];
    if(cookiesToken == undefined){
        return null;
    }
    let tokenInfo = parseAccessToken(cookiesToken);
    if(tokenInfo == undefined){
        return null;
    }

    if(tokenInfo.clientType == undefined || tokenInfo.clientType != clientType.user){
        return null;
    }else if((tokenInfo.grantDate == undefined) || ((tokenInfo.grantDate + expiredTime)<(new Date().getTime()))){
        return null;
    }
    let resultObj = {};
    resultObj ={userId:tokenInfo.userId,userType:clientType.user,status:tokenInfo.status};
    return resultObj;
}


const parseAdminToken = (req)=>{
    let cookiesToken = req.headers[headerTokenMeta];
    if(cookiesToken == undefined){
        return null;
    }
    let tokenInfo = parseAccessToken(cookiesToken);
    if(tokenInfo == undefined){
        return null;
    }

    if(tokenInfo.clientType == undefined || tokenInfo.clientType != clientType.admin){
        return null;
    }else if((tokenInfo.grantDate == undefined) || ((tokenInfo.grantDate + expiredTime)<(new Date().getTime()))){
        return null;
    }
    let resultObj = {};
    resultObj ={userId:tokenInfo.userId,userType:clientType.admin,status:tokenInfo.status};
    return resultObj;
}

const getCookie = (cookie ,name)=>{
    let arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
    if(arr=cookie.match(reg))
        return (unescape(arr[2]));
    else
        return null;
}

const saveToken = (params,callback)=>{
    httpUtil.httpPost(systemConfig.hosts.auth,'/api/token',{},params,function(error,result){
        callback(error,result)
    })
}


const removeToken = (params,callback)=>{
    httpUtil.httpDelete(systemConfig.hosts.auth,'/api/token/'+params.accessToken,{},params,function(error,result){
        callback(error,result)
    })
}

const getToken = (params,callback)=>{
    httpUtil.httpGet(systemConfig.hosts.auth,'/api/token/'+params.accessToken,{},{},function(error,result){
        callback(error,result)
    })
}

const savePasswordCode = (params,callback)=>{
    httpUtil.httpPost(systemConfig.hosts.auth,'/api/'+params.phone+"/passwordCode",{},params,function(error,result){
        callback(error,result)
    })
}

const getPasswordCode = (params,callback)=>{
    httpUtil.httpGet(systemConfig.hosts.auth,'/api/'+params.phone+"/passwordCode",{},{},function(error,result){
        callback(error,result)
    })
}
module.exports = {
    createAccessToken,
    parseAccessToken,
    clientType,
    headerTokenMeta,
    parseAdminToken,
    parseUserToken,
    saveToken,
    removeToken,
    getToken,
    savePasswordCode,
    getPasswordCode
};
