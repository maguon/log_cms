'use strict'

const mongoose = require('../../db/connections/MongoCon.js').getMongo();
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const category = new Schema({
        name: String,
        slug: String,
        order: {type: Number, default: 100},
        parent: {type: ObjectId, ref: 'category'},
        paths: [{type: ObjectId, ref: 'category'}],
        desc: String,
        status : {type: Number, default: 1}
    },
    { timestamps: { createdAt: 'created_at',updatedAt : 'updated_at' }
});

const CategoryModel = mongoose.model('category',category)
module.exports = {
    CategoryModel
}