'use strict'

const fs = require('fs');
const path = require('path');
const mongoose = require('../db/connections/MongoCon.js').getMongo();
const Schema = mongoose.Schema;
const FileSchema = new Schema({}, { strict: false });
const File = mongoose.model('File', FileSchema, 'fs.files');
const Chunks = mongoose.model('Chunks', FileSchema, 'fs.chunks');

const resUtil = require('../util/ResUtil');
const LogUtil = require('../util/LogUtil');
const logger = LogUtil.createLogger('ImageController');


const  uploadImage = (req, res, next) => {
    let params = req.params;
    const metaData = {};
    metaData.userId = params.userId;
    const filePath = req.files.image.path;
    const gridFSBucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db);
    const fileName = req.files.image.name;
    let openUploadStream = gridFSBucket.openUploadStream(fileName,{metadata:metaData,contentType:req.files.image.type});
    fs.createReadStream(filePath).pipe(openUploadStream)
        .on('error', function (error) {
            logger.error(' uploadImage ' + error.message);
            resUtil.resInternalError(error,res);
        }).on('finish', function (result) {
            logger.info(' uploadImage ' + result._id+ ' success');
            fs.unlink(filePath, (err) =>{})
            resUtil.resetQueryRes(res,{imageId:result._id},null);
            return next();
        })

}
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



}
module.exports = {
    uploadImage , getImage
}