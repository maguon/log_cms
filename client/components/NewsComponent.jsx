'use strict'

import React from 'react';
import Header from './layout/Header';
import Footer from './layout/Footer';

var sectionStyle;

export default class NewsComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let twoMenuName;
        if (this.props.newsList.length == 0 || this.props.newsList[0].menu_id.menu_pid == '-1') {
            twoMenuName = "";
        } else {
            twoMenuName = (
                <a className="black-text"
                   href={"/view/menu/" + this.props.newsList[0].menu_id._id + "/menuType/" + this.props.newsList[0].menu_id.menu_type + "/page/1/news"}>&nbsp;&gt;&nbsp;{this.props.newsList[0].menu_id.menu_name}</a>
            )
        }

        if (this.props.newsList[0] && this.props.newsList[0].menu_id && this.props.newsList[0].menu_id.banner_image && this.props.newsList[0].menu_id.banner_image != '') {
            sectionStyle = {
                backgroundImage: `url(` + (this.props.newsList[0].menu_id.banner_image) + `)`
            };
        } else {
            if (this.props.menu[0].banner_image != '' && this.props.menu[0].banner_image != null) {
                sectionStyle = {
                    backgroundImage: `url(` + (this.props.menu[0].banner_image) + `)`
                };
            } else {
                sectionStyle = {
                    backgroundImage: `url(/uploads/banner.png)`
                };
            }
        }

        return (
            <div>
                <Header menuList={this.props.menuList} logoTitle={this.props.logoTitle}/>
                <div>
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
                                    <div className="mores">
                                        <a href={"/"} className="black-text">首页</a>
                                        &nbsp;&gt;&nbsp;
                                        <a className="black-text"
                                           href={"/view/menu/" + this.props.menu[0]._id + "/menuType/" + this.props.menu[0].menu_type + "/page/1/news"}>{this.props.menu[0].menu_name}</a>
                                        {twoMenuName}
                                    </div>
                                </div>
                                <div className="profile-body">
                                    <div className="row">
                                        <div className="ab_neir">

                                            <div className="fenPianText">
                                                {
                                                    this.props.newsList.map((newsItem, index) =>
                                                        <div>
                                                            <div key={index} className="titleh5"><h5
                                                                className="center-align"></h5></div>
                                                            <p dangerouslySetInnerHTML={{__html: newsItem.news_content}}/>

                                                        </div>)
                                                }
                                            </div>

                                        </div>
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

