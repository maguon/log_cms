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
            <div>
                <Header menuList={this.props.menuList}/>
                <div className="rows">
                    <div className="collection">
                        <div className='blank'> </div>
                        <div className="example" id='menu0'>
                           {/* <div className="mask1"> SIX BRANCH OF SCIENCE AND TECHNOLOGY</div>
                            <div className="mask2"> 我们专注于品质化定制构建,企业品牌在网站中的整体梳理,网络互动的体验,以及在手机登移动端的优质呈现。</div>*/}
                            <div className="mask3 row  col s12">
                                <div className='maskLine1 col s5'></div>
                                <div className='maskClick col s2'>
                                    <a className="black-text"  href="#menu1">
                                        <i className='mdi mdi-chevron-double-down'> </i>
                                    </a>
                                </div>
                                <div className='maskLine2 col s5'></div>
                            </div>
                            <div className="ft-carousel" id="carousel_1">
                                <ul className="carousel-inner">
                                    {
                                        this.props.newsList.map((newsItem,index) =>
                                            <li className="carousel-item">
                                                <a className="collection-item" style={{padding: 0 + 'em'}} key={index} href="javascript:void(0)">
                                                    <img src={"/api/image/"+newsItem.news_image} alt={newsItem.news_title} className="hdp" />
                                                </a>
                                            </li>
                                        )
                                    }
                                </ul>
                            </div>
                        </div>

                        <div className="companyPro" id='menu1'>

                                <div className="companyInter"> </div>
                                <div className="companyContent">
                                    {
                                        this.props.briefList.map((briefItem, index) => <p className='' key={index}
                                                                                          dangerouslySetInnerHTML={{__html: briefItem.news_content}}/>)
                                    }
                                </div>
                                <div className="companyMask row  col s12">
                                    <div className='maskLine1 col s5'></div>
                                    <div className='maskClick col s2'>
                                        <a className="black-text"  href="#menu2">
                                            <i className='mdi mdi-chevron-double-down'> </i>
                                        </a>
                                    </div>
                                    <div className='maskLine2 col s5'></div>
                                </div>
                        </div>

                        <div className="productPresentation" id='menu2'>
                            <div className="productInter row col s12">
                                <h5 className='center-align'>产品介绍</h5>
                                <h5 className='center-align'>PRODUCT INTRODUCTION</h5>
                            </div>
                            <div className="borderYellow row col s12"> </div>

                            <div className='productInterduce'>
                                {
                                    this.props.productList.map((briefItem, index) => <p className='' key={index}
                                                                                      dangerouslySetInnerHTML={{__html: briefItem.news_content}}/>)
                                }
                            </div>


                            <div className='row showProduct'>
                                {
                                    this.props.newsImageList.map((newsItem, index) =>
                                        <div className='col s4 productPart'>
                                            <div className="productPartPic">
                                                <div className="silhouette_block_pic">

                                                    <a className="collection-item" href="javascript:void(0)">
                                                        <img className='imgShow' src={"/api/image/" + newsItem.news_image}/>
                                                    </a>
                                                </div>
                                            </div>

                                        </div>)
                                }
                            </div>

                            <h5 className='carH5'>车用燃料电池系统</h5>

                            <div className="productPartMask row  col s12">
                                <div className='maskLine1 col s5'></div>
                                <div className='maskClick col s2'>
                                    <a className="black-text"  href="#menu3">
                                        <i className='mdi mdi-chevron-double-down'> </i>
                                    </a>
                                </div>
                                <div className='maskLine2 col s5'></div>
                            </div>
                        </div>



                        <div className='coreBusiness' id='menu3'>

                            <div className="coreBusinessInter row col s12">
                                <h5 className='center-align'>新闻资讯</h5>
                                <h5 className='center-align'>NEWS</h5>
                            </div>
                            <div className="borderYellow3 row col s12"> </div>

                            <div className='enterpriseNews'>
                                <h6>行业动态 </h6>
                                <a  href={"/view/menu/5cada7f258f3df67d9d4b7ff/menuType/2/page/1/news"}>MORE</a>
                                <ul type="square">
                                    {
                                        this.props.enterpriseList.map((newsItem,index) =>
                                            <li>
                                                <span className='liSpan'></span>
                                                <span className='totalSpan'>{newsItem.news_title}</span>
                                            </li>)
                                    }
                                </ul>

                            </div>
                            <div className='companyNews'>
                                <h6>公司动态 </h6>
                                <a  href={"/view/menu/5cad8928f74c7c4d457c433f/menuType/2/page/1/news"}>MORE</a>
                                <ul type="square">
                                    {
                                        this.props.companyList.map((newsItem,index) =>
                                            <li>
                                                <span className='liSpan'></span>
                                                <span className='totalSpan'>{newsItem.news_title}</span>
                                            </li>)
                                    }
                                </ul>


                            </div>
                            <div className="businessMask row  col s12">
                                <div className='maskLine1 col s5'></div>
                                <div className='maskClick col s2'>
                                    <a className="black-text"  href="#menu5">
                                        <i className='mdi mdi-chevron-double-down'> </i>
                                    </a>
                                </div>
                                <div className='maskLine2 col s5'></div>
                            </div>

                        </div>



                    </div>
                </div>
                <Footer recruitList={this.props.recruitList} contactList={this.props.contactList}/>
            </div>
        );
    }

}