'use strict'

const mongoose = require('../../db/connections/MongoCon.js').getMongo();
const Schema = mongoose.Schema;
const news = new Schema({
        menu_id: { type: 'ObjectId', ref: 'menu' }, //菜单Id
        news_title:String,    //新闻标题
        news_num:Number,    //新闻序号
        news_content:String,   //新闻内容
        news_image:String,    //新闻图片
        roll_flag:{type: Number, default: 0},   //是否滚动轮播(0-否，1-是)
        news_status:{type: Number, default: 1}   //新闻显示状态(0-否，1-是)
    },
    { timestamps: { createdAt: 'created_at',updatedAt : 'updated_at' }
    });

const NewsModel = mongoose.model('news',news)
module.exports = {
    NewsModel
}