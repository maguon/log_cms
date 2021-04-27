'use strict'

const mongoose = require('../../db/connections/MongoCon.js').getMongo();
const Schema = mongoose.Schema;
const layout = new Schema(
    {
        multi_menu:{type: Number, default: 0},  //多级菜单(0-否，1-是)
        carousel: { type: String, default: '' }, // 轮播内容
        content: [{ type: String, default: '' }] // 新闻/列表/画廊
    },
    {
        timestamps: { createdAt: 'created_at',updatedAt : 'updated_at' }
    }
    );

const LayoutModel = mongoose.model('layout', layout);

module.exports = {LayoutModel};