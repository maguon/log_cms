'use strict'

const React = require('react');
const ReactDOMServer = require('react-dom/server');
const resUtil = require('../../util/ResUtil');
const {StyleModel} = require('../../modules/schemas');
const {LayoutModel} = require('../../modules/schemas');
const {MenuModel} = require('../../modules/schemas');
const {NewsModel} = require('../../modules/schemas');
import MenuComponent from '../../../client/components/MenuComponent';

const getIndexView = (req, res, next) => {
    let webSetting ={};
    let layoutSetting ={};
    let menuList ={};
    let newsList ={};
    let contentList = [];

    StyleModel.find({}).exec().then((rows)=>{
        webSetting = rows[0] || {};
    }).then(()=>{
        // 取得 layout 设置内容
        return LayoutModel.find({}).exec();
    }).then(rows=>{
        // layout 设置内容
        layoutSetting = rows[0] || {};
        // 取得 menuList
        return MenuModel.find({}).where('menu_pid').equals('-1').where('menu_status').equals('1').sort('menu_num').exec();
    }).then(rows=>{
        menuList = rows;
        return NewsModel.find({}).where('menu_id').equals(layoutSetting.carousel).sort('news_num').exec();
    }).then(async (rows)=>{
        newsList = rows;
        for (let item of layoutSetting.content) {
            let val;
            switch (item.menuType) {
                case 1 :
                    // 1-新闻
                    val = await NewsModel.find({}).where('menu_id').equals(item.menuId).skip(parseInt('0')).limit(parseInt('1')).exec();
                    contentList.push({menuType : item.menuType, menuId : item.menuId, list : val});
                    break;
                case 2 :
                    // 2-列表
                    val = await NewsModel.find({}).where('menu_id').equals(item.menuId).skip(parseInt('0')).limit(parseInt('5')).exec();
                    contentList.push({menuType : item.menuType, menuId : item.menuId, list : val});
                    break;
                case 3 :
                    // 3-图片
                    val = await NewsModel.find({}).where('menu_id').equals(item.menuId).skip(parseInt('0')).limit(parseInt('8')).exec();
                    contentList.push({menuType : item.menuType, menuId : item.menuId, list : val});
                    break;
                default:
                    break;
            }
        }
        return contentList;
    }).then(rows=>{
        const componentString = ReactDOMServer.renderToString(
            <MenuComponent {... {logoTitle:webSetting.logo_title||"", pageFooter:webSetting.page_footer||"", menuList:menuList, multiMenu:layoutSetting.multi_menu, newsList:newsList, contentList:rows}}/>);
        resUtil.resetMainPage(res,webSetting,componentString);
    }).catch(error=>{
        resUtil.resetErrorPage(res,error);
    })
};

module.exports = {
    getIndexView
};