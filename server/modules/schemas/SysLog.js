'use strict'

const mongoose = require('../../db/connections/MongoCon.js').getMongo();
const Schema = mongoose.Schema;
const syslog = new Schema({
        admin_id: { type: 'ObjectId', ref: 'admin' },
        ip:String,
        type:{type: Number, default: 1}
    },
    { timestamps: { createdAt: 'created_at',updatedAt : 'updated_at' }
    });

const SysLogModel = mongoose.model('syslog',syslog)
module.exports = {
    SysLogModel
}