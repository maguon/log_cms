'use strict'

import React from 'react';

import Header from './layout/Header';
import Footer from './layout/Footer';

var sectionStyle;

export default class PictureDetailsComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let prePage;
        if (this.props.menu[0].banner_image == null) {
            sectionStyle = {
                backgroundImage: `url(/uploads/banner.png)`
            };
        } else {
            sectionStyle = {
                backgroundImage: `url(` + (this.props.menu[0].banner_image) + `)`
            };
        }
        if (this.props.currentPage == '1' && this.props.currentPage != "" + this.props.pageObj.totalCount) {
            prePage = (
                <div className="fenPian">
                    <ul role="menu" aria-label="Pagination">
                        <li>{<a role="menuitem" className='darkColor' style={{marginLeft: 10 + 'px'}}>上一篇</a>}</li>
                        <li>{<a role="menuitem" className='greenColor' style={{marginLeft: 10 + 'px'}}
                                href={"/view/menu/" + this.props.newsList[0].menu_id._id + "/menuType/" + this.props.newsList[0].menu_id.menu_type + "/page/" + (parseInt(this.props.currentPage) + 1) + "/pictureDetails"}>下一篇</a>}</li>
                    </ul>
                </div>
            )

        } else if (this.props.currentPage != '1' && this.props.currentPage != "" + this.props.pageObj.totalCount) {
            prePage = (
                <div className="fenPian">
                    <ul role="menu" aria-label="Pagination">
                        <li>{<a role="menuitem" className='greenColor' style={{marginLeft: 10 + 'px'}}
                                href={"/view/menu/" + this.props.newsList[0].menu_id._id + "/menuType/" + this.props.newsList[0].menu_id.menu_type + "/page/" + (parseInt(this.props.currentPage) - 1) + "/pictureDetails"}>上一篇</a>}</li>
                        <li>{<a role="menuitem" className='greenColor' style={{marginLeft: 10 + 'px'}}
                                href={"/view/menu/" + this.props.newsList[0].menu_id._id + "/menuType/" + this.props.newsList[0].menu_id.menu_type + "/page/" + (parseInt(this.props.currentPage) + 1) + "/pictureDetails"}>下一篇</a>}</li>
                    </ul>
                </div>
            )
        } else if (this.props.currentPage == "" + this.props.pageObj.totalCount && this.props.currentPage != '1') {
            prePage = (

                <div className="fenPian">
                    <ul role="menu" aria-label="Pagination">
                        <li>{<a role="menuitem" className='greenColor' style={{marginLeft: 10 + 'px'}}
                                href={"/view/menu/" + this.props.newsList[0].menu_id._id + "/menuType/" + this.props.newsList[0].menu_id.menu_type + "/page/" + (parseInt(this.props.currentPage) - 1) + "/pictureDetails"}>上一篇</a>}</li>
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

        let twoMenuName;
        if (this.props.newsList.length == 0) {
            twoMenuName = "";
        } else if (this.props.newsList[0].menu_id.menu_pid !== '-1') {
            twoMenuName = (
                <a className="black-text"
                   href={"/view/menu/" + this.props.newsList[0].menu_id._id + "/menuType/" + this.props.newsList[0].menu_id.menu_type + "/page/1/news"}>&nbsp;&gt;&nbsp;{this.props.newsList[0].menu_id.menu_name}</a>
            )
        } else {
            twoMenuName = "";
        }
        return (
            <div>
                <Header menuList={this.props.menuList} logoTitle={this.props.logoTitle}/>
                <div className="job-img margin-bottom-30" style={sectionStyle}></div>
                <div className="container content profile wrap1003">
                    <div className="row marginTop50">
                        <div className="col-md-3 md-margin-bottom-40">
                            <ul className="list-group sidebar-nav-v1 margin-bottom-40" id="sidebar-nav-1">
                                <div className={"list-group-item menuName"}>{this.props.menu[0].menu_name}</div>
                                {
                                    this.props.twoMenuNameList.map((twoMenuNameItem, index) => {
                                        return <li key={index} className={["list-group-item"]}>
                                            <a key={index}
                                               href={"/view/menu/" + twoMenuNameItem._id + "/menuType/" + twoMenuNameItem.menu_type + "/page/1/news"}>{twoMenuNameItem.menu_name}</a>
                                        </li>
                                    })
                                }
                            </ul>

                        </div>
                        <div className="col-md-9">
                            <div className="kect">
                                <div className="mores"><a href="/" className="black-text">首页</a>&nbsp;&gt;&nbsp;
                                    <a className="black-text"
                                       href={"/view/menu/" + this.props.menu[0]._id + "/menuType/" + this.props.menu[0].menu_type + "/page/1/news"}>{this.props.menu[0].menu_name}</a>
                                </div>
                                {twoMenuName}
                            </div>

                            <div className="profile-body">
                                <div className="row">
                                    <div className="">
                                        <div className="pictureText">
                                            <img className="pictureImg" src={this.props.newsList[0].news_image}/>
                                            <p className="center-align"
                                               style={{marginBottom: 20 + 'px'}}>{this.props.newsList[0].news_title}</p>
                                            <p className="picture"
                                               dangerouslySetInnerHTML={{__html: this.props.newsList[0].news_content}}/>

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

