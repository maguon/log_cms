'use strict'

const mongoose = require('../../db/connections/MongoCon.js').getMongo();
const Schema = mongoose.Schema;
const menu = new Schema({
        menu_pid:String,    //上级菜单
        menu_name:String,   //菜单名称
        menu_num:Number,    //菜单序号
        menu_type:{type: Number, default: 1},  //菜单类型(1-新闻，2-列表，3-图片)
        lower_flag:{type: Number, default: 0},  //是否有下级(0-没有，1-有)
        menu_status:{type: Number, default: 1},   //菜单显示状态(0-否，1-是)
        menu_link:String    //菜单链接
    },
    { timestamps: { createdAt: 'created_at',updatedAt : 'updated_at' }
    });

const MenuModel = mongoose.model('menu',menu)
module.exports = {
    MenuModel
}