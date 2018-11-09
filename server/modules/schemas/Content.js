'use strict'

const mongoose = require('../../db/connections/MongoCon.js').getMongo();
const Schema = mongoose.Schema;
const content = new Schema({
        text: String
    },
    { timestamps: { createdAt: 'created_at',updatedAt : 'updated_at' }
    });

const ContentModel = mongoose.model('content',content)
module.exports = {
    ContentModel
}