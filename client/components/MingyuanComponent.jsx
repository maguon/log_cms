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
                            <div className="mask1"> SIX BRANCH OF SCIENCE AND TECHNOLOGY</div>
                            <div className="mask2"> 我们专注于品质化定制构建,企业品牌在网站中的整体梳理,网络互动的体验,以及在手机登移动端的优质呈现。</div>
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

                                <div className="companyInter">
                                    <h5>公司简介</h5>
                                    <h5>COMPANY PROFILE</h5>
                                </div>
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


                        <div className='coreBusiness' id='menu2'>

                                <div className="coreBusinessInter row col s12">
                                    <h5 className='center-align'>核心业务</h5>
                                    <h5 className='center-align'>CORE BUSINESS</h5>
                                </div>

                                <div className="showBusiness">
                                    {
                                        this.props.businessList.map((businessItem, index) =>

                                            <div className='showBusinessAll'>
                                                <div className='showBusinessTitle'>{businessItem.news_title}</div>
                                                <div className='showBusinessDetail'>
                                                    <p dangerouslySetInnerHTML={{__html: businessItem.news_content}}/>
                                                </div>
                                            </div>)
                                    }
                                </div>

                                <div className="businessShowImg">
                                    {
                                        this.props.newsImageList.map((imageItem, index) =>
                                            <div className="silhouette_block">
                                                <div className="silhouette_block_pic">

                                                    <a className="collection-item" key={index}
                                                       href="javascript:void(0)">
                                                        <img className='imgShow'
                                                             src={"/api/image/" + imageItem.news_image}/>
                                                    </a>
                                                </div>
                                            </div>)
                                    }

                                </div>

                            <div className="businessMask row  col s12">
                                <div className='maskLine1 col s5'></div>
                                <div className='maskClick col s2'>
                                    <a className="black-text"  href="#menu3">
                                        <i className='mdi mdi-chevron-double-down'> </i>
                                    </a>
                                </div>
                                <div className='maskLine2 col s5'></div>
                            </div>

                        </div>


                        <div className="productPresentation" id='menu3'>
                            <div className="productInter row col s12">
                                <h5 className='center-align'>产品介绍</h5>
                                <h5 className='center-align'>PRODUCT INTRODUCTION</h5>
                            </div>

                            <div className='showProduct'>
                                {
                                    this.props.productList.map((productItem, index) =>
                                        <div className='productPart'>
                                            <h6>{productItem.news_title}</h6>
                                            <p>{productItem.news_content}</p>
                                            <div className="productPartPic">
                                                <div className="silhouette_block_pic">

                                                    <a className="collection-item" href="javascript:void(0)">
                                                        <img className='imgShow' src={"/api/image/" + productItem.news_image}/>
                                                    </a>
                                                </div>
                                            </div>

                                        </div>)
                                }
                            </div>

                            <div className="productPartMask row  col s12">
                                <div className='maskLine1 col s5'></div>
                                <div className='maskClick col s2'>
                                    <a className="black-text"  href="#menu4">
                                        <i className='mdi mdi-chevron-double-down'> </i>
                                    </a>
                                </div>
                                <div className='maskLine2 col s5'></div>
                            </div>
                        </div>

                        <div className="applicationArea" id='menu4'>
                            <div className="applicationAreaInter">
                                <h5>应用领域</h5>
                                <h5>APPLICATION AREA</h5>
                            </div>
                                <div className="applicationAreaImg row col s12">
                                    {
                                        this.props.areaImageList.map((imageItem, index) =>
                                            <div className='applicationAreaImgShow col s6'>
                                                <img className='imgShow' src={"/api/image/" + imageItem.news_image}/>
                                            </div>)
                                    }

                                </div>
                            <div className="applicationAreaContent">
                                {
                                    this.props.recruitList.map((areaItem, index) => <p className='' key={index}
                                                                                      dangerouslySetInnerHTML={{__html: areaItem.news_content}}/>)
                                }
                            </div>
                            <div className="applicationAreaMask row  col s12">
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