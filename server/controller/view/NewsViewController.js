'use strict'

const React = require('react');
const ReactDOMServer = require('react-dom/server');
const resUtil = require('../../util/ResUtil');
const {StyleModel} = require('../../modules/schemas');
const {NewsModel} = require('../../modules/schemas');
const {MenuModel} = require('../../modules/schemas');
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
    let title = "";
    let cssArray=[];
    let metaArray=[];
    let scriptArray=[];
    let menuList = [];
    StyleModel.find({}).exec().then((rows)=>{
        title = rows[0].title;
        cssArray = rows[0].css_link || [];
        metaArray = rows[0].meta_link || [];
        scriptArray = rows[0].js_link || [];
        return;
    }).then(()=>{
        //header menu list
        return MenuModel.find({}).where('menu_pid').equals('-1').where('menu_status').equals('1').sort('menu_num').exec();

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
        return NewsModel.find({}).populate('menu_id').where('menu_id').equals('5c00a754a0c6192580565b26')
            .where('news_status').equals('1')
            .skip(parseInt('0')).limit(parseInt('5'))
            .sort('news_num').exec()
    }).then((rows)=>{
        newsObj.recruitList = rows;
        return NewsModel.find({}).populate('menu_id').where('menu_id').equals('5cad3f663160aa601f6de039')
            .where('news_status').equals('1')
            .sort('news_num').exec()
    }).then(rows=>{
        newsObj.contactList = rows;
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
        return listQuery.sort('news_num').exec();
    }).then(rows=>{
        if(params.menuType==1){
            const componentString = ReactDOMServer.renderToString(
                <NewsComponent {... {newsList:rows,menuList:menuList,menu:menuObj.menu,twoMenuNameList:menuObj.twoMenuNameList,profileList:newsObj.profileList,recruitList:newsObj.recruitList,contactList:newsObj.contactList,currentPage:params.page}}/>);
            resUtil.resetMainPage(res,title,cssArray,scriptArray,componentString)
        }else if(params.menuType==2){
            const componentString = ReactDOMServer.renderToString(
                <ListComponent {... {newsList:rows,menuList:menuList,menu:menuObj.menu,twoMenuNameList:menuObj.twoMenuNameList,profileList:newsObj.profileList,recruitList:newsObj.recruitList,contactList:newsObj.contactList,pageObj:pageObj,currentPage:params.page}}/>);
            resUtil.resetMainPage(res,title,cssArray,scriptArray,componentString)
        }else{
            const componentString = ReactDOMServer.renderToString(
                <PictureComponent {... {newsList:rows,menuList:menuList,menu:menuObj.menu,twoMenuNameList:menuObj.twoMenuNameList,profileList:newsObj.profileList,recruitList:newsObj.recruitList,contactList:newsObj.contactList,currentPage:params.page}}/>);
            resUtil.resetMainPage(res,title,cssArray,scriptArray,componentString)
        }
    }).catch(error=>{
        resUtil.resetErrorPage(res,error);
    })
}
/*const getNewsView = (req ,res ,next) => {
    let params = req.params;
    let pageObj = {};
    let newsObj = {};
    let menuObj = {};
    let menuFlag = true;
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
        new Promise((resolve) => {  //头部菜单
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
            new Promise((resolve) => {  //内页左侧上级菜单验证
                let query = MenuModel.find({});
                query.where('_id').equals(params.menuId);
                query.sort('menu_num').exec((error,rows)=> {
                    if(error){
                        resUtil.resetErrorPage(res,error);
                    }else{
                        if(rows[0].menu_pid!=="-1"){
                            menuObj.menuPid = rows[0].menu_pid;
                            menuFlag = false;
                        }
                        resolve(menu);
                    }
                });
            }).then((menu) => {
                new Promise((resolve) => {  //内页左侧一级菜单
                    if(menuFlag){
                        let query = MenuModel.find({});
                        query.where('_id').equals(params.menuId);
                        query.sort('menu_num').exec((error,rows)=> {
                            if(error){
                                resUtil.resetErrorPage(res,error);
                            }else{
                                menuObj.menu = rows;
                                resolve(menu);
                            }
                        });
                    }else{
                        let query = MenuModel.find({});
                        query.where('_id').equals(menuObj.menuPid);
                        query.sort('menu_num').exec((error,rows)=> {
                            if(error){
                                resUtil.resetErrorPage(res,error);
                            }else{
                                menuObj.menu = rows;
                                resolve(menu);
                            }
                        });
                    }
                }).then((menu) => {
                    new Promise((resolve) => {  //内页左侧二级菜单
                        if(menuFlag){
                            let query = MenuModel.find({});
                            query.where('menu_pid').equals(params.menuId);
                            query.sort('menu_num').exec((error,rows)=> {
                                if(error){
                                    resUtil.resetErrorPage(res,error);
                                }else{
                                    menuObj.twoMenuNameList = rows;
                                    resolve(menu);
                                }
                            });
                        }else{
                            let query = MenuModel.find({});
                            query.where('menu_pid').equals(menuObj.menuPid);
                            query.sort('menu_num').exec((error,rows)=> {
                                if(error){
                                    resUtil.resetErrorPage(res,error);
                                }else{
                                    menuObj.twoMenuNameList = rows;
                                    resolve(menu);
                                }
                            });
                        }
                    }).then((menu) => {
                        new Promise((resolve) => {  //底部招聘
                            let query = NewsModel.find({}).populate('menu_id');
                            query.where('menu_id').equals('5c00a754a0c6192580565b26');
                            query.where('news_status').equals('1');
                            query.skip(parseInt('0')).limit(parseInt('5'));
                            query.sort('news_num').exec((error,rows)=> {
                                if(error){
                                    resUtil.resetErrorPage(res,error);
                                }else{
                                    newsObj.recruitList = rows;
                                    resolve(menu);
                                }
                            })
                        }).then((menu) => {
                            new Promise((resolve) => {  //底部联系
                                let query = NewsModel.find({}).populate('menu_id');
                                query.where('menu_id').equals('5cad3f663160aa601f6de039');
                                query.where('news_status').equals('1');
                                query.sort('news_num').exec((error,rows)=> {
                                    if(error){
                                        resUtil.resetErrorPage(res,error);
                                    }else{
                                        newsObj.contactList = rows;
                                        resolve(menu);
                                    }
                                })
                            }).then((menu) => {
                                new Promise((resolve) => {
                                    let query = NewsModel.find({}).count();
                                    if(params.menuId){
                                        query.where('menu_id').equals(params.menuId);
                                    }
                                    query.where('news_status').equals('1');
                                    query.exec((error,rows)=> {
                                        if(error){
                                            resUtil.resetErrorPage(res,error);
                                        }else{
                                            pageObj.pageIndex = 1;
                                            pageObj.pageSize = 10;
                                            pageObj.totalCount = rows;
                                            pageObj.totalPage = Math.ceil(pageObj.totalCount / pageObj.pageSize);
                                            resolve(menu);
                                        }
                                    })
                                }).then((menu) => {
                                    let query = NewsModel.find({}).populate('menu_id');
                                    if(params.newsId){
                                        query.where('_id').equals(params.newsId);
                                    }
                                    if(params.menuId){
                                        query.where('menu_id').equals(params.menuId);
                                    }
                                    query.where('news_status').equals('1');
                                    if(params.menuType==2){
                                        query.skip(params.page*pageObj.pageSize -pageObj.pageSize).limit(pageObj.pageSize);
                                    }
                                    query.sort('news_num').exec((error,rows)=> {
                                        if(error){
                                            resUtil.resetErrorPage(res,error);
                                        }else{
                                            if(params.menuType==1){
                                                const componentString = ReactDOMServer.renderToString(
                                                    <NewsComponent {... {newsList:rows,menuList:menu,menu:menuObj.menu,twoMenuNameList:menuObj.twoMenuNameList,profileList:newsObj.profileList,recruitList:newsObj.recruitList,contactList:newsObj.contactList,currentPage:params.page}}/>);
                                                resUtil.resetMainPage(res,title,cssArray,scriptArray,componentString)
                                            }else if(params.menuType==2){
                                                const componentString = ReactDOMServer.renderToString(
                                                    <ListComponent {... {newsList:rows,menuList:menu,menu:menuObj.menu,twoMenuNameList:menuObj.twoMenuNameList,profileList:newsObj.profileList,recruitList:newsObj.recruitList,contactList:newsObj.contactList,pageObj:pageObj,currentPage:params.page}}/>);
                                                resUtil.resetMainPage(res,title,cssArray,scriptArray,componentString)
                                            }else{
                                                const componentString = ReactDOMServer.renderToString(
                                                    <PictureComponent {... {newsList:rows,menuList:menu,menu:menuObj.menu,twoMenuNameList:menuObj.twoMenuNameList,profileList:newsObj.profileList,recruitList:newsObj.recruitList,contactList:newsObj.contactList,currentPage:params.page}}/>);
                                                resUtil.resetMainPage(res,title,cssArray,scriptArray,componentString)
                                            }

                                        }

                                    });
                                })
                            })

                        })
                    })
                })
            })
        })
    })
}*/

const getNewsViewDetails = (req ,res ,next) => {
    let params = req.params;
    let pageObj = {};
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
            query.sort('menu_num').exec((error, rows) => {
                if (error) {
                    resUtil.resetErrorPage(res, error);
                } else {
                    resolve(rows);
                }
            });
        }).then((menu) => {
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
                        resolve(menu);
                    }
                })
            }).then((menu) => {
                new Promise((resolve) => {
                    let query = NewsModel.find({}).populate('menu_id');
                    query.where('menu_id').equals('5cad3f663160aa601f6de039');
                    query.where('news_status').equals('1');
                    query.sort('news_num').exec((error, rows) => {
                        if (error) {
                            resUtil.resetErrorPage(res, error);
                        } else {
                            newsObj.contactList = rows;
                            resolve(menu);
                        }
                    })
                }).then((menu) => {
                    new Promise((resolve) => {
                        let query = NewsModel.find({}).count();
                        if (params.menuId) {
                            query.where('menu_id').equals(params.menuId);
                        }
                        query.where('news_status').equals('1');
                        query.exec((error, rows) => {
                            if (error) {
                                resUtil.resetErrorPage(res, error);
                            } else {
                                pageObj.totalCount = rows;
                                resolve(menu);
                            }
                        })
                    }).then((menu) => {
                        let query = NewsModel.find({}).populate('menu_id');
                        if (params.newsId) {
                            query.where('_id').equals(params.newsId);
                        }
                        if (params.menuId) {
                            query.where('menu_id').equals(params.menuId);
                        }
                        query.where('news_status').equals('1');
                        query.skip(params.page - 1).limit(1);
                        query.exec((error, rows) => {
                            if (error) {
                                resUtil.resetErrorPage(res, error);
                            } else {
                                const componentString = ReactDOMServer.renderToString(
                                    <NewsDetailsComponent {... {
                                        newsList: rows,
                                        menuList: menu,
                                        menuName: rows[0].menu_id.menu_name,
                                        profileList: newsObj.profileList,
                                        recruitList: newsObj.recruitList,
                                        contactList: newsObj.contactList,
                                        pageObj: pageObj,
                                        currentPage: params.page
                                    }}/>);
                                resUtil.resetMainPage(res,title,cssArray,scriptArray, componentString)

                            }

                        });
                    })

                })

            })
        })
    })
}

const getPictureDetails = (req ,res ,next) => {
    let params = req.params;
    let pageObj = {};
    let newsObj = {};
    let menuObj = {};
    let menuFlag = true;
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
        }).then((menu) => {
            new Promise((resolve) => {
                let query = MenuModel.find({});
                query.where('_id').equals(params.menuId);
                query.sort('menu_num').exec((error,rows)=> {
                    if(error){
                        resUtil.resetErrorPage(res,error);
                    }else{
                        if(rows[0].menu_pid!=="-1"){
                            menuObj.menuPid = rows[0].menu_pid;
                            menuFlag = false;
                        }
                        resolve(menu);
                    }
                });
            }).then((menu) => {
                new Promise((resolve) => {
                    if(menuFlag){
                        let query = MenuModel.find({});
                        query.where('_id').equals(params.menuId);
                        query.sort('menu_num').exec((error,rows)=> {
                            if(error){
                                resUtil.resetErrorPage(res,error);
                            }else{
                                menuObj.menu = rows;
                                resolve(menu);
                            }
                        });
                    }else{
                        let query = MenuModel.find({});
                        query.where('_id').equals(menuObj.menuPid);
                        query.sort('menu_num').exec((error,rows)=> {
                            if(error){
                                resUtil.resetErrorPage(res,error);
                            }else{
                                menuObj.menu = rows;
                                resolve(menu);
                            }
                        });
                    }
                }).then((menu) => {
                    new Promise((resolve) => {
                        if(menuFlag){
                            let query = MenuModel.find({});
                            query.where('menu_pid').equals(params.menuId);
                            query.sort('menu_num').exec((error,rows)=> {
                                if(error){
                                    resUtil.resetErrorPage(res,error);
                                }else{
                                    menuObj.twoMenuNameList = rows;
                                    resolve(menu);
                                }
                            });
                        }else{
                            let query = MenuModel.find({});
                            query.where('menu_pid').equals(menuObj.menuPid);
                            query.sort('menu_num').exec((error,rows)=> {
                                if(error){
                                    resUtil.resetErrorPage(res,error);
                                }else{
                                    menuObj.twoMenuNameList = rows;
                                    resolve(menu);
                                }
                            });
                        }
                    }).then((menu) => {
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
                                    resolve(menu);
                                }
                            })
                        }).then((menu) => {
                            new Promise((resolve) => {
                                let query = NewsModel.find({}).populate('menu_id');
                                query.where('menu_id').equals('5bfbb62c06e91f3814c8d0e8');
                                query.where('news_status').equals('1');
                                query.sort('news_num').exec((error,rows)=> {
                                    if(error){
                                        resUtil.resetErrorPage(res,error);
                                    }else{
                                        newsObj.contactList = rows;
                                        resolve(menu);
                                    }
                                })
                            }).then((menu) => {
                                new Promise((resolve) => {
                                    let query = NewsModel.find({}).count();
                                    if(params.menuId){
                                        query.where('menu_id').equals(params.menuId);
                                    }
                                    query.where('news_status').equals('1');
                                    query.exec((error,rows)=> {
                                        if(error){
                                            resUtil.resetErrorPage(res,error);
                                        }else{
                                            pageObj.totalCount = rows;
                                            resolve(menu);
                                        }
                                    })
                                }).then((menu) => {
                                    let query = NewsModel.find({}).populate('menu_id');
                                    if(params.pictureId){
                                        query.where('_id').equals(params.pictureId);
                                    }
                                    if(params.menuId){
                                        query.where('menu_id').equals(params.menuId);
                                    }
                                    query.skip(params.page-1).limit(1);
                                    query.exec((error,rows)=> {
                                        if(error){
                                            resUtil.resetErrorPage(res,error);
                                        }else{
                                            const componentString = ReactDOMServer.renderToString(
                                                <PictureDetailsComponent {... {newsList:rows,menuList:menu,menu:menuObj.menu,twoMenuNameList:menuObj.twoMenuNameList,profileList:newsObj.profileList,recruitList:newsObj.recruitList,contactList:newsObj.contactList,pageObj:pageObj,currentPage:params.page}}/>);
                                            resUtil.resetMainPage(res,title,cssArray,scriptArray,componentString)

                                        }

                                    });
                                })

                            })

                        })
                    })
                })

            })
        })
    })
}

const getNewsViewSearch = (req ,res ,next) => {
    let params = req.query;
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
        }).then((menu) => {
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
                        resolve(menu);
                    }
                })
            }).then((menu) => {
                new Promise((resolve) => {
                    let query = NewsModel.find({}).populate('menu_id');
                    query.where('menu_id').equals('5bfbb62c06e91f3814c8d0e8');
                    query.where('news_status').equals('1');
                    query.sort('news_num').exec((error,rows)=> {
                        if(error){
                            resUtil.resetErrorPage(res,error);
                        }else{
                            newsObj.contactList = rows;
                            resolve(menu);
                        }
                    })
                }).then((menu) => {
                    let query = NewsModel.find({}).populate('menu_id');
                    if(params.search){
                        query.where('news_title').regex(params.search);
                    }

                    query.exec((error,rows)=> {
                        if(error){
                            resUtil.resetErrorPage(res,error);
                        }else{
                            const componentString = ReactDOMServer.renderToString(
                                <SearchComponent {... {newsList:rows,menuList:menu,profileList:newsObj.profileList,recruitList:newsObj.recruitList,contactList:newsObj.contactList}}/>);
                            resUtil.resetMainPage(res,title,cssArray,scriptArray,componentString)

                        }

                    });
                })

            })
        })
    })
}


module.exports = {
    getNewsView,getNewsViewDetails,getPictureDetails,getNewsViewSearch
}