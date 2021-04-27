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
    let contentTypeList = [];

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
    }).then(rows=>{
        newsList = rows;
        return MenuModel.find({}).where('_id').in(layoutSetting.content).sort('_id').exec();
    }).then(rows =>{
        contentTypeList = rows;
        return NewsModel.find({}).where('menu_id').in(layoutSetting.content).sort('menu_id').exec();
    }).then(rows=>{

        const componentString = ReactDOMServer.renderToString(
            <MenuComponent {... {logoTitle:webSetting.logo_title||"", pageFooter:webSetting.page_footer||"", menuList:menuList, multiMenu:layoutSetting.multi_menu, newsList:newsList, contentTypeList:contentTypeList, contentList:rows}}/>);
        // console.log('webSetting.logo_title 111111111111111',webSetting.logo_title);
        // console.log('webSetting.page_footer 22222222222222222',webSetting.page_footer);
        // console.log('menuList 3333333333333333333333',menuList);
        // console.log('layoutSetting.multi_menu 44444444444444',layoutSetting.multi_menu);
        //
        // console.log('newsList 55555555555555555555555555555555555',newsList);
        console.log('contentTypeList 666666666666666666666666',contentTypeList);
        console.log('contentList -------------------------');
        console.log('contentList -------------------------');
        console.log('contentList -------------------------');
        console.log('contentList -------------------------');
        console.log('contentList -------------------------');
        console.log('contentList 7777777777777777777777777777',rows);

        resUtil.resetMainPage(res,webSetting,componentString);
    }).catch(error=>{
        resUtil.resetErrorPage(res,error);
    })
};

module.exports = {
    getIndexView
};