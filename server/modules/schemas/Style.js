'use strict'

const mongoose = require('../../db/connections/MongoCon.js').getMongo();
const Schema = mongoose.Schema;
const style = new Schema({
        sid:Number,
        title:String,
        logo_title:String,
        page_footer:String,
        meta:Array,
        css_link:Array,
        js_link:Array
    },
    { timestamps: { createdAt: 'created_at',updatedAt : 'updated_at' }
    });

const StyleModel = mongoose.model('style',style)
module.exports = {
    StyleModel
}