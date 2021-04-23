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
    let idx = filePath.indexOf("\\");
    let imageId = filePath.replace('public','');
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

const  getImage = (req, res, next) => {
    let params = req.params;
    let query = File.find({});

    if(params.imageId){
        query.where('_id').equals(mongoose.Types.ObjectId(params.imageId));
    }
    query.exec((error,rows)=> {
        if(error){
            logger.error(' getImage ' + error.message);
            resUtil.resInternalError(error,res);
        }else{
            if(rows && rows.length>0){
                const gridFSBucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db);
                let openDownloadStream = gridFSBucket.openDownloadStream(mongoose.Types.ObjectId(params.imageId));
                res.set('content-type', rows[0]._doc.contentType);
                //res.set('last-modified', rows[0]._doc.uploadDate);
                res.set('etag', rows[0]._doc.md5);
                res.set('content-length', rows[0]._doc.length);

                res.writeHead(200);

                openDownloadStream
                    .on('data', (chunk) => {
                        res.write(chunk);
                    })
                    .on('end', () => {
                        logger.info('getImage ' + params.imageId + ' success ' )
                        res.end();
                    })
                    .on('error', (error) => {
                        logger.warn('getImage ' + params.imageId+' error ' )
                        res.sendStatus(404);
                    });
            }else{
                logger.warn('getImage ' + params.imageId+' not found ' )
                res.sendStatus(404);
            }
        }
    })
};


module.exports = {
    uploadImage, uploadFavicon, uploadLogo, getImage, deleteImage
};