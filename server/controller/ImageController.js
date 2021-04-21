'use strict'

const fs = require('fs');
const path = require('path');
const mongoose = require('../db/connections/MongoCon.js').getMongo();
const Schema = mongoose.Schema;
const FileSchema = new Schema({}, { strict: false });
const File = mongoose.model('File', FileSchema, 'fs.files');
const Chunks = mongoose.model('Chunks', FileSchema, 'fs.chunks');

const sysMsg = require('../util/SystemMsg');
const resUtil = require('../util/ResUtil');
const LogUtil = require('../util/LogUtil');
const logger = LogUtil.createLogger('ImageController');
const imgPath = './public/uploads/';
const favicon = 'favicon.ico';
const logo = 'logo.png';

const uploadImage = (req, res, next) => {
    let filePath = req.files.image.path;
    let idx = filePath.lastIndexOf("\\");
    let imageId = filePath.substr(idx + 1, filePath.length);
    logger.info(' uploadImage ' + filePath + ' success');
    resUtil.resetQueryRes(res, {imageId: imageId}, null);
    return next();
};

const uploadFavicon = (req, res, next) => {
    let filePath = req.files.favicon.path;
    return fs.rename(filePath, imgPath + favicon, function(err){
        if(err){
            resUtil.resetFailedRes(res,sysMsg.IMG_QUERY_NO_EXIST) ;
        }
        resUtil.resetQueryRes(res, null, null);
        return next();
    })
};

const uploadLogo = (req, res, next) => {
    let filePath = req.files.logo.path;
    return fs.rename(filePath, imgPath + logo, function(err){
        if(err){
            resUtil.resetFailedRes(res,sysMsg.IMG_QUERY_NO_EXIST) ;
        }
        resUtil.resetQueryRes(res, null, null);
        return next();
    })
};

const deleteImage = (req, res, next) => {
    let imageId = req.params.imageId;
    // 删除图片
    fs.unlink(imgPath + imageId, (err) =>{});
    logger.info(' deleteImage ' + imgPath + imageId + ' success');
    resUtil.resetQueryRes(res, {}, null);
    return next();
};

const getImage = (req, res, next) => {
    let params = req.params;
    let imagePath = imgPath + params.imageId;
    // 从文件系统中读取请求的文件内容
    fs.readFile(imagePath, function (err, data) {
        if(imagePath.lastIndexOf("png") > -1){
            if (err) {
                // HTTP 状态码: 404 : NOT FOUND
                res.writeHead(404, {'Content-Type': 'text/html'});
            } else {
                // HTTP 状态码: 200 : OK
                res.writeHead(200, {'Content-Type': 'image/png'});
                let stream = fs.createReadStream(imagePath);
                // 存储文件流
                let responseData = [];
                // 判断状态
                if (stream) {
                    stream.on('data', function(chunk) {
                        responseData.push(chunk);
                    });
                    stream.on('end', function() {
                        let finalData = Buffer.concat(responseData);
                        res.write(finalData);
                        res.end();
                    });
                }
            }
        } else {
            logger.warn('getImage ' + params.imageId + ' not found ');
            res.sendStatus(404);
        }
    });
};

module.exports = {
    uploadImage, uploadFavicon, uploadLogo, getImage, deleteImage
};