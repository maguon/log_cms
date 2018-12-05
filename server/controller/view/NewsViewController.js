'use strict'

const React = require('react');
const ReactDOMServer = require('react-dom/server');
const resUtil = require('../../util/ResUtil');

const {NewsModel} = require('../../modules/schemas');
const {MenuModel} = require('../../modules/schemas');
import NewsComponent from '../../../client/components/NewsComponent';
import ListComponent from '../../../client/components/ListComponent';
import PictureComponent from '../../../client/components/PictureComponent';
import PictureDetailsComponent from '../../../client/components/PictureDetailsComponent';
import SearchComponent from '../../../client/components/SearchComponent';

const getNewsView = (req ,res ,next) => {
    let params = req.params;
    let pageObj = {};
    let newsObj = {};
    let menuObj = {};
    new Promise((resolve) => {
        let query = MenuModel.find({});
        query.where('_id').equals(params.menuId);
        //query.where('menu_pid').equals('-1');
        query.where('menu_status').equals('1');
        query.sort('menu_num').exec((error,rows)=> {
            if(error){
                resUtil.resetErrorPage(res,error);
            }else{
                menuObj.menu = rows;
                resolve();
            }
        });
    }).then(() => {
        new Promise((resolve) => {
            let query = MenuModel.find({});
            query.where('menu_pid').equals(params.menuId);
            query.where('menu_status').equals('1');
            query.sort('menu_num').exec((error,rows)=> {
                if(error){
                    resUtil.resetErrorPage(res,error);
                }else{
                    menuObj.twoMenuNameList = rows;
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
                    query.where('menu_id').equals('5c009d25b216fe33884ca89a');
                    query.where('news_status').equals('1');
                    query.sort({'_id':-1}).exec((error,rows)=> {
                        if(error){
                            resUtil.resetErrorPage(res,error);
                        }else{
                            newsObj.profileList = rows;
                            resolve(menu);
                        }
                    })
                }).then((menu) => {
                    new Promise((resolve) => {
                        let query = NewsModel.find({});
                        query.where('menu_id').equals('5c00a754a0c6192580565b26');
                        query.where('news_status').equals('1');
                        query.skip(parseInt('0')).limit(parseInt('5'));
                        query.sort({'_id':-1}).exec((error,rows)=> {
                            if(error){
                                resUtil.resetErrorPage(res,error);
                            }else{
                                newsObj.recruitList = rows;
                                resolve(menu);
                            }
                        })
                    }).then((menu) => {
                        new Promise((resolve) => {
                            let query = NewsModel.find({});
                            query.where('menu_id').equals('5bfbb62c06e91f3814c8d0e8');
                            query.where('news_status').equals('1');
                            query.sort({'_id':-1}).exec((error,rows)=> {
                                if(error){
                                    resUtil.resetErrorPage(res,error);
                                }else{
                                    newsObj.contactList = rows;
                                    resolve(menu);
                                }
                            })
                        }).then((menu) => {
                            new Promise((resolve) => {
                                let query = NewsModel.find({});
                                query.where('menu_id').equals('5bfbb72506e91f3814c8d0ec');
                                query.where('news_status').equals('1');
                                query.sort({'news_num':-1}).exec((error,rows)=> {
                                    if(error){
                                        resUtil.resetErrorPage(res,error);
                                    }else{
                                        newsObj.newsImageList = rows;
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
                                            pageObj.pageSize = 5;
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
                                    if(params.menu_type==2){
                                        query.skip(params.page*pageObj.pageSize -pageObj.pageSize).limit(pageObj.pageSize*params.page);
                                    }
                                    query.sort({'news_num':-1}).exec((error,rows)=> {
                                        if(error){
                                            resUtil.resetErrorPage(res,error);
                                        }else{
                                            if(params.menuType==1){
                                                const componentString = ReactDOMServer.renderToString(
                                                    <NewsComponent {... {newsList:rows,menuList:menu,menu:menuObj.menu,twoMenuNameList:menuObj.twoMenuNameList,profileList:newsObj.profileList,recruitList:newsObj.recruitList,contactList:newsObj.contactList,currentPage:params.page}}/>);
                                                resUtil.resetMainPage(res,'news',componentString)
                                            }else if(params.menuType==2){
                                                const componentString = ReactDOMServer.renderToString(
                                                    <ListComponent {... {newsList:rows,menuList:menu,menu:menuObj.menu,twoMenuNameList:menuObj.twoMenuNameList,profileList:newsObj.profileList,recruitList:newsObj.recruitList,contactList:newsObj.contactList,pageObj:pageObj,currentPage:params.page}}/>);
                                                resUtil.resetMainPage(res,'list',componentString)
                                            }else{
                                                const componentString = ReactDOMServer.renderToString(
                                                    <PictureComponent {... {newsList:rows,menuList:menu,menu:menuObj.menu,twoMenuNameList:menuObj.twoMenuNameList,profileList:newsObj.profileList,recruitList:newsObj.recruitList,contactList:newsObj.contactList,newsImageList:newsObj.newsImageList,currentPage:params.page}}/>);
                                                resUtil.resetMainPage(res,'picture',componentString)
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

}

const getNewsViewDetails = (req ,res ,next) => {
    let params = req.params;
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
    }).then((menu) => {
        new Promise((resolve) => {
            let query = NewsModel.find({});
            query.where('menu_id').equals('5c009d25b216fe33884ca89a');
            query.where('news_status').equals('1');
            query.sort({'_id':-1}).exec((error,rows)=> {
                if(error){
                    resUtil.resetErrorPage(res,error);
                }else{
                    newsObj.profileList = rows;
                    resolve(menu);
                }
            })
        }).then((menu) => {
            new Promise((resolve) => {
                let query = NewsModel.find({});
                query.where('menu_id').equals('5c00a754a0c6192580565b26');
                query.where('news_status').equals('1');
                query.skip(parseInt('0')).limit(parseInt('5'));
                query.sort({'_id':-1}).exec((error,rows)=> {
                    if(error){
                        resUtil.resetErrorPage(res,error);
                    }else{
                        newsObj.recruitList = rows;
                        resolve(menu);
                    }
                })
            }).then((menu) => {
                new Promise((resolve) => {
                    let query = NewsModel.find({});
                    query.where('menu_id').equals('5bfbb62c06e91f3814c8d0e8');
                    query.where('news_status').equals('1');
                    query.sort({'_id':-1}).exec((error,rows)=> {
                        if(error){
                            resUtil.resetErrorPage(res,error);
                        }else{
                            newsObj.contactList = rows;
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
                                <NewsComponent {... {newsList:rows,menuList:menu,menuName:rows[0].menu_id.menu_name,profileList:newsObj.profileList,recruitList:newsObj.recruitList,contactList:newsObj.contactList}}/>);
                            resUtil.resetMainPage(res,'news',componentString)

                        }

                    });
                })

            })
        })
    })

}

const getPictureDetails = (req ,res ,next) => {
    let params = req.params;
    let newsObj = {};
    let menuObj = {};
    new Promise((resolve) => {
        let query = MenuModel.find({});
        query.where('_id').equals(params.menuId);
        query.where('menu_pid').equals('-1');
        query.where('menu_status').equals('1');
        query.sort('menu_num').exec((error,rows)=> {
            if(error){
                resUtil.resetErrorPage(res,error);
            }else{
                menuObj.menuName = rows[0].menu_name;
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
                query.where('menu_id').equals('5c009d25b216fe33884ca89a');
                query.where('news_status').equals('1');
                query.sort({'_id':-1}).exec((error,rows)=> {
                    if(error){
                        resUtil.resetErrorPage(res,error);
                    }else{
                        newsObj.profileList = rows;
                        resolve(menu);
                    }
                })
            }).then((menu) => {
                new Promise((resolve) => {
                    let query = NewsModel.find({});
                    query.where('menu_id').equals('5c00a754a0c6192580565b26');
                    query.where('news_status').equals('1');
                    query.skip(parseInt('0')).limit(parseInt('5'));
                    query.sort({'_id':-1}).exec((error,rows)=> {
                        if(error){
                            resUtil.resetErrorPage(res,error);
                        }else{
                            newsObj.recruitList = rows;
                            resolve(menu);
                        }
                    })
                }).then((menu) => {
                    new Promise((resolve) => {
                        let query = NewsModel.find({});
                        query.where('menu_id').equals('5bfbb62c06e91f3814c8d0e8');
                        query.where('news_status').equals('1');
                        query.sort({'_id':-1}).exec((error,rows)=> {
                            if(error){
                                resUtil.resetErrorPage(res,error);
                            }else{
                                newsObj.contactList = rows;
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
                        query.exec((error,rows)=> {
                            if(error){
                                resUtil.resetErrorPage(res,error);
                            }else{
                                const componentString = ReactDOMServer.renderToString(
                                    <PictureDetailsComponent {... {newsList:rows,menuList:menu,menuName:menuObj.menuName,profileList:newsObj.profileList,recruitList:newsObj.recruitList,contactList:newsObj.contactList,currentPage:params.page}}/>);
                                resUtil.resetMainPage(res,'pictureDetails',componentString)

                            }

                        });
                    })

                })
            })
        })
    })


}

const getNewsViewSearch = (req ,res ,next) => {
    let params = req.params;
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
    }).then((menu) => {
        new Promise((resolve) => {
            let query = NewsModel.find({});
            query.where('menu_id').equals('5c009d25b216fe33884ca89a');
            query.where('news_status').equals('1');
            query.sort({'_id':-1}).exec((error,rows)=> {
                if(error){
                    resUtil.resetErrorPage(res,error);
                }else{
                    newsObj.profileList = rows;
                    resolve(menu);
                }
            })
        }).then((menu) => {
            new Promise((resolve) => {
                let query = NewsModel.find({});
                query.where('menu_id').equals('5c00a754a0c6192580565b26');
                query.where('news_status').equals('1');
                query.skip(parseInt('0')).limit(parseInt('5'));
                query.sort({'_id':-1}).exec((error,rows)=> {
                    if(error){
                        resUtil.resetErrorPage(res,error);
                    }else{
                        newsObj.recruitList = rows;
                        resolve(menu);
                    }
                })
            }).then((menu) => {
                new Promise((resolve) => {
                    let query = NewsModel.find({});
                    query.where('menu_id').equals('5bfbb62c06e91f3814c8d0e8');
                    query.where('news_status').equals('1');
                    query.sort({'_id':-1}).exec((error,rows)=> {
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
                                <SearchComponent {... {newsList:rows,menuList:menu,menuName:rows[0].menu_id.menu_name,profileList:newsObj.profileList,recruitList:newsObj.recruitList,contactList:newsObj.contactList}}/>);
                            resUtil.resetMainPage(res,'search',componentString)

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