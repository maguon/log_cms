'use strict'

import React from 'react';

import Header from './layout/Header';
import Footer from './layout/Footer';

var sectionStyle;

export default class NewsDetailsComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        if (this.props.newsList[0] && this.props.newsList[0].menu_id && this.props.newsList[0].menu_id.banner_image && this.props.newsList[0].menu_id.banner_image != '') {
            sectionStyle = {
                backgroundImage: `url(` + (this.props.newsList[0].menu_id.banner_image) + `)`
            };
        } else {
            for (let i = 0; i < this.props.menuList.length; i++) {
                if (this.props.menuName == this.props.menuList[i].menu_name) {
                    if (this.props.menuList[i].banner_image == '' || this.props.menuList[i].banner_image == null) {
                        sectionStyle = {
                            backgroundImage: `url(/uploads/banner.png)`
                        };
                    } else {
                        sectionStyle = {
                            backgroundImage: `url(` + (this.props.menuList[i].banner_image) + `)`
                        };
                    }
                }
            }
        }


        let prePage;
        if (this.props.currentPage == '1' && this.props.currentPage !== "" + this.props.pageObj.totalCount) {
            prePage = (
                <div className="fenPian">
                    <ul role="menu" aria-label="Pagination">
                        <li>{<a role="menuitem" className='darkColor' style={{marginLeft: 10 + 'px'}}>上一篇</a>}</li>
                        <li>{<a role="menuitem" className='greenColor' style={{marginLeft: 10 + 'px'}}
                                href={"/view/menu/" + this.props.newsList[0].menu_id._id + "/menuType/2/page/" + (parseInt(this.props.currentPage) + 1) + "/newsListDetails"}>下一篇</a>}</li>
                    </ul>
                </div>
            )

        } else if (this.props.currentPage !== '1' && this.props.currentPage !== "" + this.props.pageObj.totalCount) {
            prePage = (
                <div className="fenPian">
                    <ul role="menu" aria-label="Pagination">
                        <li>{<a role="menuitem" className='greenColor' style={{marginLeft: 10 + 'px'}}
                                href={"/view/menu/" + this.props.newsList[0].menu_id._id + "/menuType/2/page/" + (parseInt(this.props.currentPage) - 1) + "/newsListDetails"}>上一篇</a>}</li>
                        <li>{<a role="menuitem" className='greenColor' style={{marginLeft: 10 + 'px'}}
                                href={"/view/menu/" + this.props.newsList[0].menu_id._id + "/menuType/2/page/" + (parseInt(this.props.currentPage) + 1) + "/newsListDetails"}>下一篇</a>}</li>
                    </ul>

                </div>
            )
        } else if (this.props.currentPage == "" + this.props.pageObj.totalCount && this.props.currentPage !== '1') {
            prePage = (
                <div className="fenPian">
                    <ul role="menu" aria-label="Pagination">
                        <li>{<a role="menuitem" className='greenColor' style={{marginLeft: 10 + 'px'}}
                                href={"/view/menu/" + this.props.newsList[0].menu_id._id + "/menuType/2/page/" + (parseInt(this.props.currentPage) - 1) + "/newsListDetails"}>上一篇</a>}</li>
                        <li>{<a role="menuitem" className='darkColor' style={{marginLeft: 10 + 'px'}}>下一篇</a>}</li>
                    </ul>
                </div>
            )
        } else {
            prePage = (

                <div className="fenPian">
                    <ul role="menu" aria-label="Pagination">
                        <li>{<a role="menuitem" className='darkColor' style={{marginLeft: 10 + 'px'}}>上一篇</a>}</li>
                        <li>{<a role="menuitem" className='darkColor' style={{marginLeft: 10 + 'px'}}>下一篇</a>}</li>
                    </ul>
                </div>
            )
        }
        return (

            <div>
                <Header menuList={this.props.menuList} logoTitle={this.props.logoTitle}/>
                <div className="job-img margin-bottom-30 " style={sectionStyle}></div>
                <div className="container content profile wrap1003">
                    <div className="row marginTop50">
                        <div className="col-md-3 md-margin-bottom-40">

                            <ul className="list-group sidebar-nav-v1 margin-bottom-40" id="sidebar-nav-1">
                                <div className={"list-group-item menuName"}>{this.props.menuName}</div>
                            </ul>

                        </div>
                        <div className="col-md-9">
                            <div className="kect">
                                <div className="mores"><a href="/" className="black-text">首页</a>&nbsp;&gt;&nbsp;
                                    <a className="black-text"
                                       href={"/view/menu/" + this.props.newsList[0].menu_id._id + "/menuType/" + this.props.newsList[0].menu_id.menu_type + "/page/1/news"}>{this.props.menuName}</a>
                                </div>
                            </div>

                            <div className="profile-body">
                                <div className="row">
                                    <div className="ab_neir">

                                        <div className="fenPianText">
                                            {
                                                this.props.newsList.map((newsItem, index) =>
                                                    <div key={index}>
                                                        <div className="titleh5"><h5
                                                            className="center-align">{newsItem.news_title}</h5></div>
                                                        <p dangerouslySetInnerHTML={{__html: newsItem.news_content}}/>

                                                    </div>)
                                            }
                                        </div>

                                        {prePage}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer pageFooter={this.props.pageFooter}/>
            </div>
        );
    }

}

