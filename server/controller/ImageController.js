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

// const  uploadImage = (req, res, next) => {
//     let params = req.params;
//     const metaData = {};
//     metaData.userId = params.userId;
//     const filePath = req.files.image.path;
//     const gridFSBucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db);
//     const fileName = req.files.image.name;
//     let openUploadStream = gridFSBucket.openUploadStream(fileName,{metadata:metaData});
//     fs.createReadStream(filePath).pipe(openUploadStream)
//         .on('error', function (error) {
//             logger.error(' uploadImage ' + error.message);
//             resUtil.resInternalError(error,res);
//         }).on('finish', function (result) {
//             logger.info(' uploadImage ' + result._id+ ' success');
//             fs.unlink(filePath, (err) =>{})
//             resUtil.resetQueryRes(res,{imageId:result._id},null);
//             return next();
//         })
//
// }

const uploadImage = (req, res, next) => {
    let filePath = req.files.image.path;
    let idx = filePath.indexOf("\\");
    let imageId = filePath.substr(idx, filePath.length);
    logger.info(' uploadImage ' + filePath + ' success');
    resUtil.resetQueryRes(res, {imageId: imageId}, null);
    return next();
};

const uploadFavicon = (req, res, next) => {
    let filePath = req.files.favicon.path;
    return fs.rename(filePath,"./public/uploads/favicon.ico", function(err){
        if(err){
            resUtil.resetFailedRes(res,sysMsg.IMG_QUERY_NO_EXIST) ;
        }
        resUtil.resetQueryRes(res, null, null);
        return next();
    })
};

const uploadLogo = (req, res, next) => {
    let filePath = req.files.logo.path;
    return fs.rename(filePath,"./public/uploads/logo.png", function(err){
        if(err){
            resUtil.resetFailedRes(res,sysMsg.IMG_QUERY_NO_EXIST) ;
        }
        resUtil.resetQueryRes(res, null, null);
        return next();
    })
};

//favor.ico logo.png
// const  getImage = (req, res, next) => {
//     let params = req.params;
//     // TODO
//     // res.sendFile( __dirname + "/" + req.url );
//     let imgPath = 'public' + params.imageId;
//
//     // 从文件系统中读取请求的文件内容
//     fs.readFile(imgPath, function (err, data) {
//         if(imgPath.lastIndexOf("png") > -1){
//             if (err) {
//                 console.log(err);
//                 // HTTP 状态码: 404 : NOT FOUND
//                 res.writeHead(404, {'Content-Type': 'text/html'});
//             }else{
//                 // HTTP 状态码: 200 : OK
//                 res.writeHead(200, {'Content-Type': 'image/png'});
//                 var stream = fs.createReadStream( imgPath );
//                 //存储文件流
//                 var responseData = [];
//                 //判断状态
//                 if (stream) {
//                     stream.on( 'data', function( chunk ) {
//                         responseData.push( chunk );
//                     });
//                     stream.on( 'end', function() {
//                         var finalData = Buffer.concat( responseData );
//                         res.write( finalData );
//                         res.end();
//                     });
//                 }
//             }
//         }else{
//             logger.warn('getImage ' + params.imageId + ' not found ')
//             res.sendStatus(404);
//         }
//     });
// };

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
    uploadImage, uploadFavicon, uploadLogo, getImage
};