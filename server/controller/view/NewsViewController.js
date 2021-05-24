'use strict'

const React = require('react');
const ReactDOMServer = require('react-dom/server');
const resUtil = require('../../util/ResUtil');
const {StyleModel} = require('../../modules/schemas');
const {NewsModel} = require('../../modules/schemas');
const {MenuModel} = require('../../modules/schemas');
const {MenuTreeModel} = require('../../modules/schemas');
import NewsComponent from '../../../client/components/NewsComponent';
import NewsDetailsComponent from '../../../client/components/NewsDetailsComponent';
import ListComponent from '../../../client/components/ListComponent';
import PictureComponent from '../../../client/components/PictureComponent';
import PictureDetailsComponent from '../../../client/components/PictureDetailsComponent';
import SearchComponent from '../../../client/components/SearchComponent';

const getNewsView = (req ,res ,next) => {
    let params = req.params;
    let pageObj = {};
    let newsObj = {};
    let menuObj = {};
    let menuFlag = true;
    let menuList =[];
    let webSetting = {};
    StyleModel.find({}).exec().then((rows)=>{
        webSetting = rows[0] || {}
        return;
    }).then(()=>{
        // 取得 menuList
        return MenuTreeModel.find({}).exec();
        // return MenuModel.find({}).where('menu_pid').equals('-1').where('menu_header_show').equals('1').where('menu_status').equals('1').sort('menu_num').exec();
    }).then(rows=>{
        menuList = rows;
        return MenuModel.find({}).where('_id').equals(params.menuId).sort('menu_num').exec();
    }).then(rows=>{
        if(rows[0].menu_pid!=="-1"){
            menuObj.menuPid = rows[0].menu_pid;
            menuFlag = false;
        }
        if(menuFlag){
            return MenuModel.find({}).where('_id').equals(params.menuId).sort('menu_num').exec();
        }else{
            return MenuModel.find({}).where('_id').equals(menuObj.menuPid).sort('menu_num').exec();
        }

    }).then(rows=>{
        menuObj.menu = rows;
        if(menuFlag){
            return MenuModel.find({}).where('menu_pid').equals(params.menuId).sort('menu_num').exec();
        }else{
            return MenuModel.find({}).where('menu_pid').equals(menuObj.menuPid).sort('menu_num').exec();
        }
    }).then(rows=>{
        menuObj.twoMenuNameList = rows;
        let countQuery =NewsModel.find({}).count();
        if(params.menuId){
            countQuery.where('menu_id').equals(params.menuId);
        }
        countQuery.where('news_status').equals('1');
        return countQuery.exec();
    }).then(rows=>{
        pageObj.pageIndex = 1;
        pageObj.pageSize = 10;
        pageObj.totalCount = rows;
        pageObj.totalPage = Math.ceil(pageObj.totalCount / pageObj.pageSize);
        let listQuery = NewsModel.find({}).populate('menu_id');
        if(params.newsId){
            listQuery.where('_id').equals(params.newsId);
        }
        if(params.menuId){
            listQuery.where('menu_id').equals(params.menuId);
        }
        listQuery.where('news_status').equals('1');
        if(params.menuType==2){
            listQuery.skip(params.page*pageObj.pageSize -pageObj.pageSize).limit(pageObj.pageSize);
        }
        return listQuery.sort('news_num').sort({'created_at':-1}).exec();
    }).then(rows=>{
        if(params.menuType==1){
            const componentString = ReactDOMServer.renderToString(
                <NewsComponent {... {logoTitle:webSetting.logo_title||"",pageFooter:webSetting.page_footer||"",newsList:rows,menuList:menuList,menu:menuObj.menu,twoMenuNameList:menuObj.twoMenuNameList,currentPage:params.page}}/>);
            resUtil.resetMainPage(res,webSetting, componentString)
        }else if(params.menuType==2){
            const componentString = ReactDOMServer.renderToString(
                <ListComponent {... {logoTitle:webSetting.logo_title||"",pageFooter:webSetting.page_footer||"",newsList:rows,menuList:menuList,menu:menuObj.menu,twoMenuNameList:menuObj.twoMenuNameList,pageObj:pageObj,currentPage:params.page}}/>);
            resUtil.resetMainPage(res,webSetting,componentString)
        }else{
            const componentString = ReactDOMServer.renderToString(
                <PictureComponent {... {logoTitle:webSetting.logo_title||"",pageFooter:webSetting.page_footer||"",newsList:rows,menuList:menuList,menu:menuObj.menu,twoMenuNameList:menuObj.twoMenuNameList,currentPage:params.page}}/>);
            resUtil.resetMainPage(res,webSetting,componentString)
        }
    }).catch(error=>{
        resUtil.resetErrorPage(res,error);
    })
};

const getNewsViewDetails = (req ,res ,next) => {
    let params = req.params;
    let pageObj = {};
    let newsObj = {};
    let webSetting ={};
    let menuList ={};

    StyleModel.find({}).exec().then((rows)=>{
        webSetting = rows[0] || {};
    }).then(()=>{
        // 取得 menuList
        return MenuTreeModel.find({}).exec();
        // return MenuModel.find({}).where('menu_pid').equals('-1').where('menu_header_show').equals('1').where('menu_status').equals('1').sort('menu_num').exec();
    }).then(rows=>{
        menuList = rows;
        let query = NewsModel.find({}).count();
        if (params.menuId) {
            query.where('menu_id').equals(params.menuId);
        }
        return query.where('news_status').equals('1').exec();
    }).then(rows => {
        pageObj.totalCount = rows;

        let query = NewsModel.find({}).populate('menu_id');
        if (params.newsId) {
            query.where('_id').equals(params.newsId);
        }
        if (params.menuId) {
            query.where('menu_id').equals(params.menuId);
        }
        return query.where('news_status').equals('1').sort('news_num').sort({'created_at':-1}).skip(params.page - 1).limit(1).exec();
    }).then(rows=>{
        const componentString = ReactDOMServer.renderToString(
            <NewsDetailsComponent {... {
                logoTitle:webSetting.logo_title||"",
                pageFooter:webSetting.page_footer||"",
                newsList: rows,
                menuList: menuList,
                menuName: rows[0].menu_id.menu_name,
                pageObj: pageObj,
                currentPage: params.page
            }}/>);
        resUtil.resetMainPage(res, webSetting, componentString);
    }).catch(error=>{
        resUtil.resetErrorPage(res, error);
    })
};

const getPictureDetails = (req ,res ,next) => {
    let params = req.params;
    let menuFlag = true;
    let webSetting ={};
    let menuList ={};
    let pageObj = {};
    let newsObj = {};
    let menuObj = {};

    StyleModel.find({}).exec().then((rows)=>{
        webSetting = rows[0] || {};
    }).then(()=>{
        // 取得 menuList
        return MenuTreeModel.find({}).exec();
        // return MenuModel.find({}).where('menu_pid').equals('-1').where('menu_header_show').equals('1').where('menu_status').equals('1').sort('menu_num').exec();
    }).then(rows=>{
        menuList = rows;
        return MenuModel.find({}).where('_id').equals(params.menuId).sort('menu_num').exec();
    }).then(rows=>{
        if(rows[0].menu_pid!=="-1"){
            menuObj.menuPid = rows[0].menu_pid;
            menuFlag = false;
        }

        if(menuFlag){
            return MenuModel.find({}).where('_id').equals(params.menuId).sort('menu_num').exec();
        }else{
            return MenuModel.find({}).where('_id').equals(menuObj.menuPid).sort('menu_num').exec();
        }
    }).then(rows=>{
        menuObj.menu = rows;

        if(menuFlag){
            return MenuModel.find({}).where('menu_pid').equals(params.menuId).sort('menu_num').exec();
        }else{
            return MenuModel.find({}).where('menu_pid').equals(menuObj.menuPid).sort('menu_num').exec();
        }
    }).then(rows=>{
        menuObj.twoMenuNameList = rows;
        let query = NewsModel.find({}).count();
        if(params.menuId){
            query.where('menu_id').equals(params.menuId);
        }
        return query.where('news_status').equals('1').exec();
    }).then(rows=>{
        pageObj.totalCount = rows;

        let query = NewsModel.find({}).populate('menu_id');
        if(params.pictureId){
            query.where('_id').equals(params.pictureId);
        }
        if(params.menuId){
            query.where('menu_id').equals(params.menuId);
        }
        return query.skip(params.page-1).limit(1).exec();
    }).then(rows=>{
        const componentString = ReactDOMServer.renderToString(
            <PictureDetailsComponent {... {logoTitle:webSetting.logo_title||"",pageFooter:webSetting.page_footer||"",newsList:rows,menuList:menuList,menu:menuObj.menu,twoMenuNameList:menuObj.twoMenuNameList,pageObj:pageObj,currentPage:params.page}}/>);
        resUtil.resetMainPage(res, webSetting, componentString);
    }).catch(error=>{
        resUtil.resetErrorPage(res,error);
    })
};

const getNewsViewSearch = (req ,res ,next) => {
    let params = req.query;
    let newsObj = {};
    let webSetting ={};
    let menuList ={};

    StyleModel.find({}).exec().then((rows)=>{
        webSetting = rows[0] || {};
    }).then(()=>{
        // 取得 menuList
        return MenuTreeModel.find({}).exec();
        // return MenuModel.find({}).where('menu_pid').equals('-1').where('menu_header_show').equals('1').where('menu_status').equals('1').sort('menu_num').exec();
    }).then(rows=>{
        menuList = rows;
        let query = NewsModel.find({}).populate('menu_id');
        if(params.search){
            query.where('news_title').regex(params.search);
        }
        return query.exec();
    }).then(rows=>{
        const componentString = ReactDOMServer.renderToString(
            <SearchComponent {... {logoTitle:webSetting.logo_title||"",pageFooter:webSetting.page_footer||"",newsList:rows,menuList:menuList}}/>);
        resUtil.resetMainPage(res, webSetting, componentString)
    }).catch(error=>{
        resUtil.resetErrorPage(res,error);
    })
};

module.exports = {
    getNewsView, getNewsViewDetails, getPictureDetails, getNewsViewSearch
};