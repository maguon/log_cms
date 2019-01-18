'use strict'

import React from 'react';

import  Header from './layout/Header';
import  Footer from './layout/Footer';

export default class HongliComponent  extends React.Component {
    constructor(props) {
        super(props);
    }
    render () {
        let carLink;
        if(this.props.newsImageList.length===0){
            carLink = "";
        }else{
            carLink = "/view/menu/"+this.props.newsImageList[0].menu_id._id+"/menuType/"+this.props.newsImageList[0].menu_id.menu_type+"/page/1/news";
        }
        return (
            <div>
                <Header menuList={this.props.menuList}/>
                <div className="rows">
                    <div className="collection">
                        <div className="example">
                            <div className="mask">
                                <h4>洪溧物流</h4>
                                <h5>大连洪溧物流有限公司口号标语</h5>
                                <p>大连顺通圣世物流有限公司成立于2013年1月14日，位于大连市保税区瑞港路，临近疏港高速，主营商品汽车运输、普通货物运输、集装箱运输、零部件运输、仓储等，并在沈阳、长春、天津、上海、广州、成都设有办事处。</p>
                            </div>
                            <div className="ft-carousel" id="carousel_1">
                                <ul className="carousel-inner">
                                    {
                                        this.props.newsList.map((newsItem,index) =>
                                            <li className="carousel-item">
                                                <a className="collection-item" style={{padding: 0 + 'em'}} key={index} href={"/view/menu/"+newsItem.menu_id._id+"/menuType/"+newsItem.menu_id.menu_type+"/news/"+newsItem._id.toString()+"/page/1"}>
                                                    <img src={"/api/image/"+newsItem.news_image} alt={newsItem.news_title} className="hdp" />
                                                </a>

                                            </li>
                                        )
                                    }
                                </ul>
                            </div>
                        </div>



                        <div id="companyProfile">
                            <div id="companyInter">
                                <div className="ff">
                                    <div className="companyH2">
                                        <h2>
                                            <span>公司简介</span>
                                        </h2>
                                        <span className="span1"> </span>
                                    </div>
                                    <p className='Pspan'>大连顺通圣世物流有限公司成立于2013年1月14日，位于大连市保税区瑞港路，临近疏港高速，主营商品汽车运输、普通货物运输、集装箱运输、零部件运输、仓储等，并在沈阳、长春、天津、上海、广州、成都设有办事处。</p>
                                </div>
                            </div>
                        </div>


                        <div  id='showCarPlace'>
                            <div id="hdjy">
                                <div className="kect_index">
                                    <h4>业务范围</h4>
                                </div>

                                <div className="showBusiness">
                                    <div className='showBusinessAll'>
                                        <div className='showBusinessTitle'>业务一</div>
                                        <div className='showBusinessDetail'>
                                            大连顺通圣世物流有限公司成立于2013年1月14日，位于大连市保税区瑞港路，临近疏港高速，主营商品汽车运输、普通货物运输、集装箱运输、零部件运输、仓储等，并在沈阳、长春、天津、上海、广州、成都设有办事处。
                                        </div>
                                    </div>
                                    <div className='showBusinessAll'>
                                        <div className='showBusinessTitle'>业务二</div>
                                        <div className='showBusinessDetail'>
                                            大连顺通圣世物流有限公司成立于2013年1月14日，位于大连市保税区瑞港路，临近疏港高速，主营商品汽车运输、普通货物运输、集装箱运输、零部件运输、仓储等，并在沈阳、长春、天津、上海、广州、成都设有办事处。
                                        </div>
                                    </div>
                                    <div className='showBusinessAll'>
                                        <div className='showBusinessTitle'>业务一</div>
                                        <div className='showBusinessDetail'>
                                            大连顺通圣世物流有限公司成立于2013年1月14日，位于大连市保税区瑞港路，临近疏港高速，主营商品汽车运输、普通货物运输、集装箱运输、零部件运输、仓储等，并在沈阳、长春、天津、上海、广州、成都设有办事处。
                                        </div>
                                    </div>
                                </div>

                                <div className="showImg">
                                    {
                                        this.props.newsImageList.map((imageItem,index) =>
                                            <div className="silhouette_block">
                                                <div className="silhouette_block_pic">
                                                    <a className="collection-item" key={index} href={"/view/menu/"+imageItem.menu_id._id+"/menuType/"+imageItem.menu_id.menu_type+"/picture/"+imageItem._id.toString()+"/page/1"}>
                                                        <img className='imgShow' src={"/api/image/"+imageItem.news_image} /></a> </div>

                                            </div>)
                                    }

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer profileList={this.props.profileList} recruitList={this.props.recruitList} contactList={this.props.contactList} />
            </div>
        );
    }

}