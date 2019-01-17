'use strict'

const mongoose = require('../../db/connections/MongoCon.js').getMongo();
const Schema = mongoose.Schema;
const style = new Schema({
        css_link:Array,
        js_link:Array
    },
    { timestamps: { createdAt: 'created_at',updatedAt : 'updated_at' }
    });

const StyleModel = mongoose.model('style',style)
module.exports = {
    StyleModel
}