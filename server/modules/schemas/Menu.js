'use strict'

const mongoose = require('../../db/connections/MongoCon.js').getMongo();
const Schema = mongoose.Schema;
const menu = new Schema({
        menu_pid:Number,    //上级菜单
        menu_name:String,   //菜单名称
        menu_level:Number,  //菜单级别
        menu_num:Number,    //菜单序号
        lower_flag:{type: Number, default: 1},  //是否有下级(1-没有，2-有)
        show_flag:{type: Number, default: 1},   //是否显示(0-否，1-是)
        menu_link:String    //菜单链接
    },
    { timestamps: { createdAt: 'created_at',updatedAt : 'updated_at' }
    });

const MenuModel = mongoose.model('menu',menu)
module.exports = {
    MenuModel
}