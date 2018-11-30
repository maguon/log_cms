'use strict'

const React = require('react');
const ReactDOMServer = require('react-dom/server');
const resUtil = require('../../util/ResUtil');

const {MenuModel} = require('../../modules/schemas');
const {NewsModel} = require('../../modules/schemas');
import MenuComponent from '../../../client/components/MenuComponent';

const getMenuView = (req, res, next) => {
    let newsObj = {};
    new Promise((resolve) => {
        let query = MenuModel.find({});
        query.where('menu_pid').equals('-1');
        query.where('menu_status').equals('1');
        query.sort('menu_num').exec((error,rows)=> {
            if(error){
                resUtil.resetErrorPage(res,error);
            }else{
                resolve(rows);
            }
        });
    }).then((menuList) => {
        new Promise((resolve) => {
            let query = NewsModel.find({});
            query.where('menu_id').equals('5bfbb72506e91f3814c8d0ec');
            query.where('news_status').equals('1');
            query.sort({'_id':-1}).exec((error,rows)=> {
                if(error){
                    resUtil.resetErrorPage(res,error);
                }else{
                    newsObj.newsImageList = rows;
                    resolve(menuList);
                }
            })
        }).then((menuList) => {
            new Promise((resolve) => {
                let query = NewsModel.find({});
                query.where('menu_id').equals('5bfbb65606e91f3814c8d0ea');
                query.where('news_status').equals('1');
                query.sort({'_id':-1}).exec((error,rows)=> {
                    if(error){
                        resUtil.resetErrorPage(res,error);
                    }else{
                        newsObj.partnersList = rows;
                        resolve(menuList);
                    }
                })
            }).then((menuList) => {
                new Promise((resolve) => {
                    let query = NewsModel.find({});
                    query.where('menu_id').equals('5c009d25b216fe33884ca89a');
                    query.where('news_status').equals('1');
                    query.sort({'_id':-1}).exec((error,rows)=> {
                        if(error){
                            resUtil.resetErrorPage(res,error);
                        }else{
                            newsObj.profileList = rows;
                            resolve(menuList);
                        }
                    })
                }).then((menuList) => {
                    new Promise((resolve) => {
                        let query = NewsModel.find({});
                        query.where('menu_id').equals('5c00a754a0c6192580565b26');
                        query.where('news_status').equals('1');
                        query.sort({'_id':-1}).exec((error,rows)=> {
                            if(error){
                                resUtil.resetErrorPage(res,error);
                            }else{
                                newsObj.recruitList = rows;
                                resolve(menuList);
                            }
                        })
                    }).then((menuList) => {
                        new Promise((resolve) => {
                            let query = NewsModel.find({});
                            query.where('menu_id').equals('5bfbb62c06e91f3814c8d0e8');
                            query.where('news_status').equals('1');
                            query.sort({'_id':-1}).exec((error,rows)=> {
                                if(error){
                                    resUtil.resetErrorPage(res,error);
                                }else{
                                    newsObj.contactList = rows;
                                    resolve(menuList);
                                }
                            })
                        }).then((menuList) => {
                            let query = NewsModel.find({});
                            query.where('roll_flag').equals('1');
                            query.where('news_status').equals('1');
                            query.sort({'_id':-1}).exec((error,rows)=> {
                                if(error){
                                    resUtil.resetErrorPage(res,error);
                                }else{
                                    const componentString = ReactDOMServer.renderToString(
                                        <MenuComponent {... {menuList:menuList,newsList:rows,newsImageList:newsObj.newsImageList,partnersList:newsObj.partnersList,contactList:newsObj.contactList,profileList:newsObj.profileList,recruitList:newsObj.recruitList}}/>);
                                    resUtil.resetMainPage(res,'Menu',componentString)
                                }
                            })
                        })
                    })
                })
            })
        })
    })
}


module.exports = {
    getMenuView
}