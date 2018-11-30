'use strict'

const React = require('react');
const ReactDOMServer = require('react-dom/server');
const resUtil = require('../../util/ResUtil');

const {NewsModel} = require('../../modules/schemas');
const {MenuModel} = require('../../modules/schemas');
import NewsComponent from '../../../client/components/NewsComponent';
import ListComponent from '../../../client/components/ListComponent';
import PictureComponent from '../../../client/components/PictureComponent';

const getNewsView = (req ,res ,next) => {
    let params = req.params;
    let MenuName = "";
    let contactList = "";
    let profileList ="";
    new Promise((resolve) => {
        let query = MenuModel.find({});
        query.where('_id').equals(params.menuId);
        query.where('menu_pid').equals('-1');
        query.where('menu_status').equals('1');
        query.sort('menu_num').exec((error,rows)=> {
            if(error){
                resUtil.resetErrorPage(res,error);
            }else{
                MenuName = rows[0].menu_name;
                resolve();
            }
        });
    }).then(() => {
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
        }).then((menu) => {
            new Promise((resolve) => {
                let query = NewsModel.find({});
                query.where('menu_id').equals('5bfbb62c06e91f3814c8d0e8');
                query.where('news_status').equals('1');
                query.sort({'_id':-1}).exec((error,rows)=> {
                    if(error){
                        resUtil.resetErrorPage(res,error);
                    }else{
                        contactList = rows;
                        resolve(menu);
                    }
                })
            }).then((menu) => {
                new Promise((resolve) => {
                    let query = NewsModel.find({});
                    query.where('menu_id').equals('5c009d25b216fe33884ca89a');
                    query.where('news_status').equals('1');
                    query.sort({'_id':-1}).exec((error,rows)=> {
                        if(error){
                            resUtil.resetErrorPage(res,error);
                        }else{
                            profileList = rows;
                            resolve(menu);
                        }
                    })
                }).then((menu) => {
                    let query = NewsModel.find({});
                    if(params.newsId){
                        query.where('_id').equals(params.newsId);
                    }
                    if(params.menuId){
                        query.where('menu_id').equals(params.menuId);
                    }
                    if(params.start && params.size){
                        query.skip(parseInt(params.start)).limit(parseInt(params.size));
                    }
                    query.exec((error,rows)=> {
                        if(error){
                            resUtil.resetErrorPage(res,error);
                        }else{
                            if(params.menuType==1){
                                const componentString = ReactDOMServer.renderToString(
                                    <NewsComponent {... {newsList:rows,menuList:menu,menuName:MenuName,contactList:contactList,profileList:profileList}}/>);
                                resUtil.resetMainPage(res,'news',componentString)
                            }else if(params.menuType==2){
                                const componentString = ReactDOMServer.renderToString(
                                    <ListComponent {... {newsList:rows,menuList:menu,menuName:MenuName,contactList:contactList,profileList:profileList}}/>);
                                resUtil.resetMainPage(res,'list',componentString)
                            }else{
                                const componentString = ReactDOMServer.renderToString(
                                    <PictureComponent {... {newsList:rows,menuList:menu,menuName:MenuName,contactList:contactList,profileList:profileList}}/>);
                                resUtil.resetMainPage(res,'picture',componentString)
                            }

                        }

                    });
                })
            })

        })
    })

}

const getNewsViewDetails = (req ,res ,next) => {
    let params = req.params;
    let contactList = "";
    let profileList ="";
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
    }).then((menu) => {
        new Promise((resolve) => {
            let query = NewsModel.find({});
            query.where('menu_id').equals('5bfbb62c06e91f3814c8d0e8');
            query.where('news_status').equals('1');
            query.sort({'_id':-1}).exec((error,rows)=> {
                if(error){
                    resUtil.resetErrorPage(res,error);
                }else{
                    contactList = rows;
                    resolve(menu);
                }
            })
        }).then((menu) => {
            new Promise((resolve) => {
                let query = NewsModel.find({});
                query.where('menu_id').equals('5c009d25b216fe33884ca89a');
                query.where('news_status').equals('1');
                query.sort({'_id':-1}).exec((error,rows)=> {
                    if(error){
                        resUtil.resetErrorPage(res,error);
                    }else{
                        profileList = rows;
                        resolve(menu);
                    }
                })
            }).then((menu) => {
               let query = NewsModel.find({}).populate('menu_id');
                if(params.newsId){
                    query.where('_id').equals(params.newsId);
                }
                query.exec((error,rows)=> {
                    if(error){
                        resUtil.resetErrorPage(res,error);
                    }else{
                        const componentString = ReactDOMServer.renderToString(
                            <NewsComponent {... {newsList:rows,menuList:menu,menuName:rows[0].menu_id.menu_name,contactList:contactList,profileList:profileList}}/>);
                        resUtil.resetMainPage(res,'news',componentString)

                    }

                });
            })
        })
    })

}


module.exports = {
    getNewsView,getNewsViewDetails
}