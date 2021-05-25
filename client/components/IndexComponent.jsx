'use strict'

import React from 'react';
import Header from './layout/Header';
import Footer from './layout/Footer';

var sectionStyle;
export default class IndexComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let newsArray = [];
        let listItem = [];
        let imgItem = [];
        for (let i = 0; i < this.props.contentList.length; i++) {
            /*新闻类型*/
            if (this.props.contentList[i].menuType == 1) {
                for (let j = 0; j < this.props.contentList[i].list.length; j++) {
                    if (this.props.contentList[i].list[j].menu_id.bg_image == null) {
                        sectionStyle = {};
                    } else {
                        sectionStyle = {
                            backgroundImage: `url(` + (this.props.contentList[i].list[j].menu_id.bg_image) + `)`
                        };
                    }
                }

                newsArray.push(
                    this.props.contentList[i].list.map((newsItem, index) =>
                        <div className="service-info" style={sectionStyle} id={newsItem.menu_id._id} key={index}>
                            <div className="container content-sm">
                                <div className="headline-center-v2 headline-center-v2-dark margin-bottom-20">
                                    <h2>
                                        <a key={index}
                                           href={"/view/menu/" + newsItem.menu_id._id + "/menuType/1/page/1/news"}>
                                            {newsItem.news_title}
                                        </a>
                                    </h2>
                                    <span className="bordered-icon">
                                                <span className="glyphicon glyphicon-th-large"></span>
                                            </span>
                                    <div className='textNews'><p
                                        dangerouslySetInnerHTML={{__html: newsItem.news_content}}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                )
            }
            /*列表类型*/
            else if (this.props.contentList[i].menuType == 2) {
                for (let j = 0; j < this.props.contentList[i].list.length; j++) {
                    if (this.props.contentList[i].list[j].menu_id.bg_image == null) {
                        sectionStyle = {};
                    } else {
                        sectionStyle = {
                            backgroundImage: `url(` + (this.props.contentList[i].list[j].menu_id.bg_image) + `)`
                        };
                    }
                }
                listItem = (
                    this.props.contentList[i].list.map((listItem, index) => {
                            return <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12'>
                                <a key={index} className="collection-item listItem" key={index}
                                   href={"/view/menu/" + listItem.menu_id._id + "/menuType/" + listItem.menu_id.menu_type + "/page/" + (index + 1) + "/newsListDetails"}>
                                    <span className='fontWeight'>> </span>{listItem.news_title}
                                    <span className="rq">{listItem.created_at.toLocaleDateString()}</span>
                                </a>
                            </div>
                        }
                    )
                );
                if (this.props.contentList[i].list.length !== 0) {
                    newsArray.push(
                        <div className="service-info" style={sectionStyle}
                             id={this.props.contentList[i].list[0].menu_id._id}>
                            <div className="content-sm">
                                <div className="headline-center-v2 headline-center-v2-dark margin-bottom-20">
                                    <h2>
                                        <a key={i}
                                           href={"/view/menu/" + this.props.contentList[i].list[0].menu_id._id + "/menuType/2/page/1/news"}>
                                            {this.props.contentList[i].list[0].menu_id.menu_name}
                                        </a>
                                    </h2>
                                    <span className="bordered-icon"><span
                                        className="glyphicon glyphicon-th-large"></span></span>
                                </div>

                                <div className="indexRow">
                                    <div className="col-md-12">
                                        <div className="margin-bottom-30">
                                            <i className="service-info-icon rounded-x icon-wrench"></i>
                                            <div className="info-description">
                                                <ul className="indexC">
                                                    <li>
                                                        {listItem}
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }
            }
            /*图片类型*/
            else if (this.props.contentList[i].menuType == 3) {
                for (let j = 0; j < this.props.contentList[i].list.length; j++) {
                    if (this.props.contentList[i].list[j].menu_id.bg_image == null) {
                        sectionStyle = {};
                    } else {
                        sectionStyle = {
                            backgroundImage: `url(` + (this.props.contentList[i].list[j].menu_id.bg_image) + `)`
                        };
                    }
                }
                imgItem = (
                    this.props.contentList[i].list.map((imageItem, index) => {
                            if (index < 6) {
                                return <a className="col-lg-2 col-md-4 col-sm-6 col-xs-12" key={index}>
                                    <img className="imgItems" src={imageItem.news_image}/></a>
                            } else {
                                return;
                            }

                        }
                    )
                )
                if (this.props.contentList[i].list.length !== 0) {
                    newsArray.push(
                        <div className="service-info" style={sectionStyle}
                             id={this.props.contentList[i].list[0].menu_id._id}>
                            <div className="content-sm_img">
                                <div className="headline-center-v2 headline-center-v2-dark margin-bottom-20">
                                    <h2>
                                        <a key={i} className="black-text"
                                           href={"/view/menu/" + this.props.contentList[i].list[0].menu_id._id + "/menuType/3/page/1/news"}>{this.props.contentList[i].list[0].menu_id.menu_name}</a>
                                    </h2>
                                    <span className="bordered-icon"><span
                                        className="glyphicon glyphicon-th-large"></span></span>
                                    <div className="profile-body imgList">
                                        <div> {imgItem}</div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    )
                }


            }
        }

        return (
            <div style={{height: '100%'}}>
                {/*项目 Header*/}
                <Header menuList={this.props.menuList} logoTitle={this.props.logoTitle} multiMenu={this.props.multiMenu}/>

                {/*轮播图片*/}
                <section id="intro" className="intro-section">
                    <div className="fullscreenbanner-container">
                        <div className="fullscreenbanner">
                            <ul>
                                {this.props.newsList.map((newsItem, index) =>
                                    <li key={index} data-transition="curtain-1" data-slotamount="5"
                                        data-masterspeed="700">
                                        <img src={newsItem.news_image} alt={newsItem.news_title} data-bgfit="cover"
                                             data-bgposition="center center" data-bgrepeat="no-repeat"/>

                                        {newsItem.news_title == "" ? "" :
                                            <div className="tp-caption rs-caption-1 sft start"
                                                 data-x="center"
                                                 data-hoffset="0"
                                                 data-y="100"
                                                 data-speed="800"
                                                 data-start="2000"
                                                 data-easing="Back.easeInOut"
                                                 data-endspeed="300"
                                                 style={{zIndex: 6}}>
                                                {newsItem.news_title}
                                            </div>
                                        }

                                        {newsItem.news_content == "" ? "" :
                                            <div className="tp-caption rs-caption-2 sft"
                                                 data-x="center"
                                                 data-hoffset="0"
                                                 data-y="200"
                                                 data-speed="1000"
                                                 data-start="3000"
                                                 data-easing="Power4.easeOut"
                                                 data-endspeed="300"
                                                 data-endeasing="Power1.easeIn"
                                                 data-captionhidden="off"
                                                 style={{zIndex: 6}}>
                                                {newsItem.news_content}
                                            </div>}
                                    </li>
                                )}
                            </ul>
                            <div className="tp-bannertimer tp-bottom"></div>
                        </div>
                    </div>
                </section>

                {/*layOut*/}
                {(newsArray == [] || newsArray == null) ? "" :
                    <div className='layout'>
                        {newsArray}
                    </div>
                }
                {/* 项目 Footer */}
                <Footer pageFooter={this.props.pageFooter}/>
            </div>
        );
    }
}