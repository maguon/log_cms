'use strict'

const React = require('react');
const ReactDOMServer = require('react-dom/server');
const resUtil = require('../../util/ResUtil');
const {StyleModel} = require('../../modules/schemas');
const {MenuModel} = require('../../modules/schemas');
const {NewsModel} = require('../../modules/schemas');
import MenuComponent from '../../../client/components/MenuComponent';
import HongliComponent from '../../../client/components/HongliComponent';
import MingyuanComponent from '../../../client/components/MingyuanComponent';

const getMenuView = (req, res, next) => {
    let newsObj = {};
    let title = "";
    let cssArray=[];
    let scriptArray=[];
    new Promise((resolve) => {
        let query = StyleModel.find({});
        query.exec((error,rows)=> {
            if(error){
                resUtil.resetErrorPage(res,error);
            }else{
                title = rows[0].title;
                for(let i = 0;i<rows[0].css_link.length;i++){
                    cssArray[i] = rows[0].css_link[i];
                }
                for(let i = 0;i<rows[0].js_link.length;i++){
                    scriptArray[i] = rows[0].js_link[i];
                }
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
        }).then((menuList) => {
            new Promise((resolve) => {
                let query = NewsModel.find({}).populate('menu_id');
                query.where('menu_id').equals('5bfbb72506e91f3814c8d0ec');
                query.where('news_status').equals('1');
                query.skip(parseInt('0')).limit(parseInt('8'));
                query.sort('news_num').exec((error,rows)=> {
                    if(error){
                        resUtil.resetErrorPage(res,error);
                    }else{
                        newsObj.newsImageList = rows;
                        resolve(menuList);
                    }
                })
            }).then((menuList) => {
                new Promise((resolve) => {
                    let query = NewsModel.find({}).populate('menu_id');
                    query.where('menu_id').equals('5bfbb65606e91f3814c8d0ea');
                    query.where('news_status').equals('1');
                    query.skip(parseInt('0')).limit(parseInt('10'));
                    query.sort('news_num').exec((error,rows)=> {
                        if(error){
                            resUtil.resetErrorPage(res,error);
                        }else{
                            newsObj.partnersList = rows;
                            resolve(menuList);
                        }
                    })
                }).then((menuList) => {
                    new Promise((resolve) => {
                        let query = NewsModel.find({}).populate('menu_id');
                        query.where('menu_id').equals('5c00a754a0c6192580565b26');
                        query.where('news_status').equals('1');
                        query.skip(parseInt('0')).limit(parseInt('5'));
                        query.sort('news_num').exec((error,rows)=> {
                            if(error){
                                resUtil.resetErrorPage(res,error);
                            }else{
                                newsObj.recruitList = rows;
                                resolve(menuList);
                            }
                        })
                    }).then((menuList) => {
                        new Promise((resolve) => {
                            let query = NewsModel.find({}).populate('menu_id');
                            query.where('menu_id').equals('5bfbb62c06e91f3814c8d0e8');
                            query.where('news_status').equals('1');
                            query.sort('news_num').exec((error,rows)=> {
                                if(error){
                                    resUtil.resetErrorPage(res,error);
                                }else{
                                    newsObj.contactList = rows;
                                    resolve(menuList);
                                }
                            })
                        }).then((menuList) => {
                            let query = NewsModel.find({}).populate('menu_id');
                            query.where('roll_flag').equals('1');
                            query.where('news_status').equals('1');
                            query.skip(parseInt('0')).limit(parseInt('4'));
                            query.sort('news_num').exec((error,rows)=> {
                                if(error){
                                    resUtil.resetErrorPage(res,error);
                                }else{
                                    const componentString = ReactDOMServer.renderToString(
                                        <MenuComponent {... {menuList:menuList,newsList:rows,newsImageList:newsObj.newsImageList,partnersList:newsObj.partnersList,contactList:newsObj.contactList,profileList:newsObj.profileList,recruitList:newsObj.recruitList}}/>);
                                    resUtil.resetMainPage(res,title,cssArray,scriptArray,componentString)
                                }
                            })
                        })
                    })
                })
            })
        })
    })

}

const getHongliView = (req, res, next) => {
    let newsObj = {};
    let title = "";
    let cssArray=[];
    let scriptArray=[];
    new Promise((resolve) => {
        let query = StyleModel.find({});
        query.exec((error,rows)=> {
            if(error){
                resUtil.resetErrorPage(res,error);
            }else{
                title = rows[0].title;
                for(let i = 0;i<rows[0].css_link.length;i++){
                    cssArray[i] = rows[0].css_link[i];
                }
                for(let i = 0;i<rows[0].js_link.length;i++){
                    scriptArray[i] = rows[0].js_link[i];
                }
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
        }).then((menuList) => {
            new Promise((resolve) => {  //简介
                let query = NewsModel.find({}).populate('menu_id');
                query.where('menu_id').equals('5c45604bebe4b95fab90bd4f');
                query.where('news_status').equals('1');
                query.sort('news_num').exec((error,rows)=> {
                    if(error){
                        resUtil.resetErrorPage(res,error);
                    }else{
                        newsObj.briefList = rows;
                        resolve(menuList);
                    }
                })
            }).then((menuList) => { //业务范围
                new Promise((resolve) => {
                    let query = NewsModel.find({}).populate('menu_id');
                    query.where('menu_id').equals('5c456072ebe4b95fab90bd50');
                    query.where('news_status').equals('1');
                    query.skip(parseInt('0')).limit(parseInt('3'));
                    query.sort('news_num').exec((error, rows) => {
                        if (error) {
                            resUtil.resetErrorPage(res, error);
                        } else {
                            newsObj.businessList = rows;
                            resolve(menuList);
                        }
                    })
                }).then((menuList) => { //物流图片
                    new Promise((resolve) => {
                        let query = NewsModel.find({}).populate('menu_id');
                        query.where('menu_id').equals('5c45611eebe4b95fab90bd53');
                        query.where('news_status').equals('1');
                        query.skip(parseInt('0')).limit(parseInt('4'));
                        query.sort('news_num').exec((error, rows) => {
                            if (error) {
                                resUtil.resetErrorPage(res, error);
                            } else {
                                newsObj.newsImageList = rows;
                                resolve(menuList);
                            }
                        })
                    }).then((menuList) => {
                        new Promise((resolve) => {
                            let query = NewsModel.find({}).populate('menu_id');
                            query.where('menu_id').equals('5c00a754a0c6192580565b26');
                            query.where('news_status').equals('1');
                            query.skip(parseInt('0')).limit(parseInt('5'));
                            query.sort('news_num').exec((error, rows) => {
                                if (error) {
                                    resUtil.resetErrorPage(res, error);
                                } else {
                                    newsObj.recruitList = rows;
                                    resolve(menuList);
                                }
                            })
                        }).then((menuList) => {
                            new Promise((resolve) => {
                                let query = NewsModel.find({}).populate('menu_id');
                                query.where('menu_id').equals('5c45608aebe4b95fab90bd51');
                                query.where('news_status').equals('1');
                                query.sort('news_num').exec((error, rows) => {
                                    if (error) {
                                        resUtil.resetErrorPage(res, error);
                                    } else {
                                        newsObj.contactList = rows;
                                        resolve(menuList);
                                    }
                                })
                            }).then((menuList) => {
                                let query = NewsModel.find({}).populate('menu_id');
                                query.where('roll_flag').equals('1');
                                query.where('news_status').equals('1');
                                query.skip(parseInt('0')).limit(parseInt('4'));
                                query.sort('news_num').exec((error, rows) => {
                                    if (error) {
                                        resUtil.resetErrorPage(res, error);
                                    } else {
                                        const componentString = ReactDOMServer.renderToString(
                                            <HongliComponent {... {
                                                menuList: menuList,
                                                newsList: rows,
                                                briefList:newsObj.briefList,
                                                businessList: newsObj.businessList,
                                                newsImageList: newsObj.newsImageList,
                                                partnersList: newsObj.partnersList,
                                                contactList: newsObj.contactList,
                                                recruitList: newsObj.recruitList
                                            }}/>);
                                        resUtil.resetMainPage(res, title, cssArray, scriptArray, componentString)
                                    }
                                })
                            })
                        })
                    })
                })
            })
        })
    })

}

const getMingyuanView = (req, res, next) => {
    let newsObj = {};
    let title = "";
    let cssArray=[];
    let scriptArray=[];
    new Promise((resolve) => {
        let query = StyleModel.find({});
        query.exec((error,rows)=> {
            if(error){
                resUtil.resetErrorPage(res,error);
            }else{
                title = rows[0].title;
                for(let i = 0;i<rows[0].css_link.length;i++){
                    cssArray[i] = rows[0].css_link[i];
                }
                for(let i = 0;i<rows[0].js_link.length;i++){
                    scriptArray[i] = rows[0].js_link[i];
                }
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
        }).then((menuList) => {
            new Promise((resolve) => {  //简介
                let query = NewsModel.find({}).populate('menu_id');
                query.where('menu_id').equals('5cad3ee93160aa601f6de035');
                query.where('news_status').equals('1');
                query.sort('news_num').exec((error,rows)=> {
                    if(error){
                        resUtil.resetErrorPage(res,error);
                    }else{
                        newsObj.briefList = rows;
                        resolve(menuList);
                    }
                })
            }).then((menuList) => {
                new Promise((resolve) => {  //产品介绍
                    let query = NewsModel.find({}).populate('menu_id');
                    query.where('menu_id').equals('5cad3f163160aa601f6de036');
                    query.where('news_status').equals('1');
                    query.sort('news_num').exec((error, rows) => {
                        if (error) {
                            resUtil.resetErrorPage(res, error);
                        } else {
                            newsObj.productList = rows;
                            resolve(menuList);
                        }
                    })
                }).then((menuList) => {
                    new Promise((resolve) => {  //产品图片
                        let query = NewsModel.find({}).populate('menu_id');
                        query.where('menu_id').equals('5cad8a49b479af6077816a52');
                        query.where('news_status').equals('1');
                        query.skip(parseInt('0')).limit(parseInt('3'));
                        query.sort('news_num').exec((error, rows) => {
                            if (error) {
                                resUtil.resetErrorPage(res, error);
                            } else {
                                newsObj.newsImageList = rows;
                                resolve(menuList);
                            }
                        })
                    }).then((menuList) => {
                        new Promise((resolve) =>{   //行业动态
                            let query = NewsModel.find({}).populate('menu_id');
                            query.where('menu_id').equals('5cada7f258f3df67d9d4b7ff');
                            query.where('news_status').equals('1');
                            query.skip(parseInt('0')).limit(parseInt('4'));
                            query.sort('news_num').exec((error, rows) => {
                                if (error) {
                                    resUtil.resetErrorPage(res, error);
                                } else {
                                    newsObj.enterpriseList = rows;
                                    resolve(menuList);
                                }
                            })
                        }).then((menuList) => {
                            new Promise((resolve) =>{   //公司动态
                                let query = NewsModel.find({}).populate('menu_id');
                                query.where('menu_id').equals('5cad8928f74c7c4d457c433f');
                                query.where('news_status').equals('1');
                                query.skip(parseInt('0')).limit(parseInt('4'));
                                query.sort('news_num').exec((error, rows) => {
                                    if (error) {
                                        resUtil.resetErrorPage(res, error);
                                    } else {
                                        newsObj.companyList = rows;
                                        resolve(menuList);
                                    }
                                })
                            }).then((menuList) => {
                                new Promise((resolve) => {  //招贤纳士
                                    let query = NewsModel.find({}).populate('menu_id');
                                    query.where('menu_id').equals('5cada6adb466a367b4939d16');
                                    query.where('news_status').equals('1');
                                    query.sort('news_num').exec((error, rows) => {
                                        if (error) {
                                            resUtil.resetErrorPage(res, error);
                                        } else {
                                            newsObj.recruitList = rows;
                                            resolve(menuList);
                                        }
                                    })

                                }).then((menuList) => {
                                    new Promise((resolve) => {  //关于我们
                                        let query = NewsModel.find({}).populate('menu_id');
                                        query.where('menu_id').equals('5ca30a9883613532986ce902');
                                        query.where('news_status').equals('1');
                                        query.sort('news_num').exec((error, rows) => {
                                            if (error) {
                                                resUtil.resetErrorPage(res, error);
                                            } else {
                                                newsObj.contactList = rows;
                                                resolve(menuList);
                                            }
                                        })
                                    }).then((menuList) => {
                                        let query = NewsModel.find({}).populate('menu_id');
                                        query.where('roll_flag').equals('1');
                                        query.where('news_status').equals('1');
                                        //query.skip(parseInt('0')).limit(parseInt('4'));
                                        query.sort('news_num').exec((error, rows) => {
                                            if (error) {
                                                resUtil.resetErrorPage(res, error);
                                            } else {
                                                const componentString = ReactDOMServer.renderToString(
                                                    <MingyuanComponent {... {
                                                        menuList: menuList,
                                                        newsList: rows,
                                                        briefList:newsObj.briefList,
                                                        productList: newsObj.productList,
                                                        newsImageList: newsObj.newsImageList,
                                                        enterpriseList : newsObj.enterpriseList,
                                                        companyList: newsObj.companyList,
                                                        recruitList: newsObj.recruitList,
                                                        contactList: newsObj.contactList
                                                    }}/>);
                                                resUtil.resetMainPage(res, title, cssArray, scriptArray, componentString)
                                            }
                                        })
                                    })
                                })
                            })
                        })
                    })
                })
            })
        })
    })

}


module.exports = {
    getMenuView,
    getHongliView,
    getMingyuanView
}