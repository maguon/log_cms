'use strict'

import React from 'react';

import  Header from './layout/Header';
import  Footer from './layout/Footer';

export default class MingyuanComponent  extends React.Component {
    constructor(props) {
        super(props);
    }
    render () {
        return (
            <div style={{height:'100%'}}>
                {/* 项目 Header */}
                <Header menuList={this.props.menuList}/>

                {/* 轮播图片 */}
                <div id="menu0" className="pushpin example" data-target="menu0">
                    <div className="row">
                        <div className="col s12">
                            <div className="carousel carousel-slider">
                                <a className="carousel-item" href="#one!"><img src="https://lorempixel.com/800/400/food/1"/></a>
                                <a className="carousel-item" href="#two!"><img src="https://lorempixel.com/800/400/food/2"/></a>
                                <a className="carousel-item" href="#three!"><img src="https://lorempixel.com/800/400/food/3"/></a>
                                <a className="carousel-item" href="#four!"><img src="https://lorempixel.com/800/400/food/4"/></a>
                            </div>
                        </div>
                    </div>


                    <div className="mask3 row  col s12" style={{margin:0}}>
                        <div className='maskLine1 col s5'/>
                        <div className='maskClick col s2'>
                            <a className="black-text"  href="#menu1">
                                <i className='mdi mdi-chevron-double-down'> </i>
                            </a>
                        </div>
                        <div className='maskLine2 col s5'/>
                    </div>

                    <div className="carousel carousel-slider" id='carousel' style={{height: '100%'}}>
                        {this.props.newsList.map((newsItem, index) =>
                            <a className="carousel-item" id='imgA' style={{padding: 0 + 'em'}} key={index}
                               href="javascript:void(0)">
                                <img src={"/api/image/" + newsItem.news_image} alt={newsItem.news_title} className="hdp"
                                     id='hdp'/>
                            </a>
                        )}
                    </div>

                </div>

                {/* 公司简介 */}
                <div id="menu1" className="pushpin companyPro" data-target="menu1">
                    {/* 公司简介 header */}
                    <div className="row">
                        <img src="../../backend/assets/images/compan_title.png" className="companyInter"/>
                    </div>
                    {/* 公司简介 body */}
                    <div className="row companyContent">
                        {this.props.briefList.map((briefItem, index) => <p className='' key={index} dangerouslySetInnerHTML={{__html: briefItem.news_content}}/>)}
                    </div>
                    {/* 公司简介 footer */}
                    <div className="row companyMask" style={{margin:0}}>
                        <div className='maskLine1 col s5'/>
                        <div className='maskClick col s2'>
                            <a className="black-text"  href="#menu2">
                                <i className='mdi mdi-chevron-double-down'> </i>
                            </a>
                        </div>
                        <div className='maskLine2 col s5'/>
                    </div>
                </div>

                {/* 产品介绍 */}
                <div id="menu2" className="pushpin productPresentation" data-target="menu2">
                    {/* 产品介绍 header */}
                    <div className="row productInter">
                        <h5 className='center-align'>产品介绍</h5>
                        <h5 className='center-align'>PRODUCT INTRODUCTION</h5>
                    </div>
                    <div className="row borderYellow"/>

                    {/* 产品介绍 body */}
                    <div className='row productInterduce'>
                        {this.props.productList.map((briefItem, index) => <p className='' key={index} dangerouslySetInnerHTML={{__html: briefItem.news_content}}/>)}
                    </div>

                    <div className='row showProduct'>
                        {this.props.newsImageList.map((newsItem, index) =>
                            <div className='col s12 m4 productPart'>
                                <a className="collection-item" href="javascript:void(0)">
                                    <img className='responsive-img' src={"/api/image/" + newsItem.news_image}/>
                                </a>
                            </div>)
                        }
                    </div>

                    <h5>车用燃料电池系统</h5>
                    {/* 产品介绍 footer */}
                    <div className="row productPartMask" style={{margin:0}}>
                        <div className='maskLine1 col s5'/>
                        <div className='maskClick col s2'>
                            <a className="black-text"  href="#menu3">
                                <i className='mdi mdi-chevron-double-down'> </i>
                            </a>
                        </div>
                        <div className='maskLine2 col s5'/>
                    </div>
                </div>

                {/* 新闻资讯 */}
                <div id="menu3" className="pushpin coreBusiness" data-target="menu3">
                    {/* 新闻资讯 header */}
                    <div className="row coreBusinessInter">
                        <h5 className='center-align'>新闻资讯</h5>
                        <h5 className='center-align'>NEWS</h5>
                    </div>
                    <div className="row borderYellow"> </div>

                    {/* 新闻资讯 body */}
                    <div className="row" style={{marginTop:'50px'}}>
                        <div className="col s12 m6">
                            <div className="col s6 left-align"><span className="news_type">行业动态</span></div>
                            <div className="col s6 right-align">
                                <a className="news_more" href={"/view/menu/5cada7f258f3df67d9d4b7ff/menuType/2/page/1/news"}>MORE</a>
                            </div>
                            <div className='col s12 enterpriseNews'>
                                <ul type="square">
                                    {this.props.enterpriseList.map((newsItem, index) =>
                                        <li>
                                            <span className='liSpan'/>
                                            <a className="totalSpan" key={index}
                                               href={"/view/menu/" + newsItem.menu_id._id + "/menuType/" + newsItem.menu_id.menu_type + "/news/" + newsItem._id.toString() + "/page/1"}>
                                                {newsItem.news_title}
                                            </a>
                                        </li>)
                                    }
                                </ul>
                            </div>
                        </div>

                        <div className="col s12 m6">
                            <div className="col s6 left-align"><span className="news_type">公司动态</span></div>
                            <div className="col s6 right-align">
                                <a className="news_more" href={"/view/menu/5cad8928f74c7c4d457c433f/menuType/2/page/1/news"}>MORE</a>
                            </div>

                            <div className='col s12 companyNews'>
                                <ul type="square">
                                    {this.props.companyList.map((newsItem, index) =>
                                        <li>
                                            <span className='liSpan'/>
                                            <a className="totalSpan" key={index}
                                               href={"/view/menu/" + newsItem.menu_id._id + "/menuType/" + newsItem.menu_id.menu_type + "/news/" + newsItem._id.toString() + "/page/1"}>
                                                {newsItem.news_title}
                                            </a>
                                        </li>)
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* 新闻资讯 footer */}
                    <div className="row businessMask" style={{margin:0}}>
                        <div className='maskLine1 col s5'/>
                        <div className='maskClick col s2'>
                            <a className="black-text"  href="#menu5">
                                <i className='mdi mdi-chevron-double-down'> </i>
                            </a>
                        </div>
                        <div className='maskLine2 col s5'/>
                    </div>
                </div>

                {/* 项目 Footer */}
                <Footer recruitList={this.props.recruitList} contactList={this.props.contactList}/>
            </div>
        );
    }
}