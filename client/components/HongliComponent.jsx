'use strict'

import React from 'react';

import  Header from './layout/Header';
import  Footer from './layout/Footer';

export default class HongliComponent  extends React.Component {
    constructor(props) {
        super(props);
    }
    render () {
        return (
            <div>
                <Header menuList={this.props.menuList} logoTitle={this.props.logoTitle}/>
                <div className="rows">
                    <div className="collection">
                        <div className="example">
                            <div className="mask">
                                <h4>洪溧物流</h4>
                                <h5>上海洪溧物流有限公司口号标语</h5>
                                <p>上海洪溧物流有限公司成立于2013年1月14日，位于，上海市浦东新区外高桥保税区临近高速，主营商品汽车运输、普通货物运输、集装箱运输、零部件运输、仓储等，并在长三角，珠三角地区设有办事处。</p>
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



                        <div className="companyProfile" id='menu0'>
                            <div id="companyInter">
                                <div className="ff">
                                    <div className="companyH2">
                                        <h2>
                                            <span>公司简介</span>
                                        </h2>
                                        <span className="span1"> </span>
                                    </div>

                                {
                                        this.props.briefList.map((briefItem,index) => <p className='Pspan' key={index} dangerouslySetInnerHTML={{ __html: briefItem.news_content }} />)
                                    }
                                </div>
                            </div>
                        </div>


                        <div  className='showCarPlace' id='menu1'>
                            <div id="hdjy">
                                <div className="kect_index">
                                    <h4>业务范围</h4>
                                </div>

                                <div className="showBusiness">
                                    {
                                        this.props.businessList.map((businessItem,index) =>

                                            <div className='showBusinessAll'>
                                                <div className='showBusinessTitle'>{businessItem.news_title}</div>
                                                <div className='showBusinessDetail'>
                                                    <p dangerouslySetInnerHTML={{ __html: businessItem.news_content }} />
                                                </div>
                                            </div>)
                                    }
                                </div>

                                <div className="showImg">
                                    {
                                        this.props.newsImageList.map((imageItem,index) =>
                                            <div className="silhouette_block">
                                                <div className="silhouette_block_pic">

                                                <a className="collection-item" key={index} href="javascript:void(0)">
                                                    <img className='imgShow' src={"/api/image/"+imageItem.news_image} />
                                                </a>
                                                </div>


                                            </div>)
                                    }

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer recruitList={this.props.recruitList} contactList={this.props.contactList} />
            </div>
        );
    }

}