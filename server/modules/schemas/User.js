'use strict'

const mongoose = require('../../db/connections/MongoCon.js').getMongo();
const Schema = mongoose.Schema;
const user = new Schema({
        user_name:String,
        password:String,
        phone:String,
        sex:{type: Number, default: 1},
        type:{type: Number, default: 1},
        status:{type: Number, default: 1}
    },
    { timestamps: { createdAt: 'created_at',updatedAt : 'updated_at' }
    });

const UserModel = mongoose.model('user',user)
module.exports = {
    UserModel
}