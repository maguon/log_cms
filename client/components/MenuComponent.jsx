'use strict'

import React from 'react';

import  Header from './layout/Header';
import  Footer from './layout/Footer';

export default class MenuComponent  extends React.Component {
    constructor(props) {
        super(props);
    }
    render () {
        return (
            <div>
                <Header menuList={this.props.menuList}/>
                <div className="rows">
                    <div className="collection">
                        <div className="example">
                            <div className="ft-carousel" id="carousel_1">
                                <ul className="carousel-inner">
                                    <li className="carousel-item">
                                            {
                                                this.props.newsList.map((newsItem,index) => <a className="collection-item" key={index} href={"/view/news/"+newsItem._id.toString()}>
                                    <img src={"http://stg.myxxjs.com:9002/api/image/"+newsItem.news_image} alt={newsItem.news_title} className="hdp" /></a>)
                                             }
                                    </li>
                                </ul>
                            </div>
                        </div>



                        <div id="companyInter">
                            <div>
                                <div className="ff">
                                    <div className="companyH2">
                                        <h2>
                                            <a href="frontnews?md=2" >公司简介</a>
                                        </h2>
                                        <h5>Companyprofile</h5>
                                        <span className="span1"></span>
                                    </div>
                                    <p className='Pspan'>&nbsp;大连顺通圣世物流有限公司成立于2013年1月14日，位于大连市保税区瑞港路，临近疏港高速，主营商品汽车运输、普通货物运输、集装箱运输、零部件运输、仓储等，并在沈阳、长春、天津、上海、广州、成都设有办事处。</p>
                                </div>
                                <div className="ff"><img src="../backend/assets/images/arrowr.png" alt="qcys" />
                                    <div className='carName'>汽车运输</div>
                                </div>
                                <div className="ff"><img src="../backend/assets/images/arrowr.png" alt="qcys" />
                                    <div>汽车运输</div>
                                </div>
                                <div className="ff"><img src="../backend/assets/images/arrowr.png" alt="qcys" />
                                    <div>汽车运输</div>
                                </div>
                            </div>
                        </div>


                        <div  id='showCarPlace'>
                            <div id="hdjy">
                                <div className="kect_index">
                                    <h2 className="ab_guanyu_index">
                                        <a href="frontpicture?p=1&amp;md=19" target="_blank">车辆场地展示</a>
                                    </h2>
                                    <h5>Car show</h5>
                                </div>

                                <div className="showImg">
                                    {
                                        this.props.newsImageList.map((imageItem,index) =>
                                            <div className="silhouette_block">
                                                <div className="silhouette_block_pic">
                                            <a className="collection-item" key={index} href={"/view/news/"+imageItem._id.toString()}>
                                            <img src={"http://stg.myxxjs.com:9002/api/image/"+imageItem.news_image} /></a> </div>
                                                 <div className="silhouette_block_word">   {imageItem.news_title} </div>

                                            </div>)
                                    }

                                </div>
                            </div>
                        </div>


                        <div className="wrap1003_index">
                            <div id="yqlj">
                                <div className="kect_index">
                                    <h2 className="ab_guanyu_index1">
                                        <a href="#">合作伙伴</a>
                                    </h2>
                                    <h5>partners</h5>
                                </div>
                                <div className="ab_neir ab_neirMenu">
                                    <ul className="yoqlj">
                                        {
                                            this.props.partnersList.map((partnersItem,index) =>
                                                <li><img src={"http://stg.myxxjs.com:9002/api/image/"+partnersItem.news_image} /> </li>)
                                        }
                                    </ul>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <Footer/>
            </div>
        );
    }

}

