'use strict'

import React from 'react';

import Header from './layout/Header';
import Footer from './layout/Footer';

var sectionStyle;

export default class ListComponent extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {
        let twoMenuName;
        if (this.props.twoMenuNameList.length == 0) {
            twoMenuName = ''
        } else if (this.props.newsList[0].menu_id !== '-1') {
            twoMenuName = (
                <a className="black-text"
                   href={"/view/menu/" + this.props.newsList[0].menu_id._id + "/menuType/" + this.props.newsList[0].menu_id.menu_type + "/page/1/news"}>&nbsp;&gt;&nbsp;{this.props.newsList[0].menu_id.menu_name}</a>
            )
        } else {
            twoMenuName = ''
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
        let prePage;
        let items = [];
        let pageList;
        for (var i = 1; i <= this.props.pageObj.totalPage; i++) {
            if (this.props.pageObj.totalPage !== 0 && this.props.currentPage == '1' && this.props.currentPage !== "" + this.props.pageObj.totalPage) {
                if (this.props.currentPage == i) {
                    items.push(<li className="active"><a href="#">{i}</a></li>);
                } else {
                    items.push(<li><a style={{marginLeft: 10 * {i} + 'px'}}
                                      href={"/view/menu/" + this.props.menu[0]._id + "/menuType/2/page/" + (parseInt(this.props.currentPage) + 1) + "/news"}>{i}</a>
                    </li>);
                }


                prePage = (
                    <div className="fenye">
                        <div className="text-center">
                            <ul className="pagination">
                                {items}
                            </ul>
                        </div>


                        {/*    <span className="fenyez12g fenyez1 pageList">共{
                        this.props.pageObj.totalCount
                    }条
                    </span>
                    {
                        <a   className="pageList" style={{marginLeft:10+'px'}}  >上一页</a>
                    }

                    <span className="fenyez12g pageList fenyez2 center" style={{marginLeft:10+'px'}}> {this.props.currentPage}</span>

                    {
                        <a className="pageList" style={{marginLeft:10+'px'}} href={"/view/menu/"+this.props.menu[0]._id+"/menuType/2/page/"+(parseInt(this.props.currentPage)+1)+"/news"}  >下一页</a>
                    }*/}
                    </div>
                )

            } else if (this.props.pageObj.totalPage !== 0 && this.props.currentPage !== '1' && this.props.currentPage !== "" + this.props.pageObj.totalPage) {
                if (this.props.currentPage == i) {
                    items.push(<li className="active"><a href="#">{i}</a></li>);
                } else if (this.props.currentPage < i) {
                    items.push(<li><a style={{marginLeft: 10 * {i} + 'px'}}
                                      href={"/view/menu/" + this.props.menu[0]._id + "/menuType/2/page/" + (parseInt(this.props.currentPage) + 1) + "/news"}>{i}</a>
                    </li>);
                } else {
                    items.push(<li><a style={{marginLeft: 10 * {i} + 'px'}}
                                      href={"/view/menu/" + this.props.menu[0]._id + "/menuType/2/page/" + (parseInt(this.props.currentPage) - 1) + "/news"}>{i}</a>
                    </li>);

                }
                prePage = (
                    <div className="fenye">
                        <div className="text-center">
                            <ul className="pagination">
                                {items}
                            </ul>
                        </div>

                        {/* <span className="fenyez12g fenyez1 pageList">共{
                        this.props.pageObj.totalCount
                    }条
                    </span>
                    {
                        <a  className="pageList" style={{marginLeft:10+'px'}} href={"/view/menu/"+this.props.newsList[0].menu_id._id+"/menuType/2/page/"+(parseInt(this.props.currentPage)-1)+"/news"}   >上一页</a>
                    }

                    <span className="fenyez12g pageList fenyez2 center" style={{marginLeft:10+'px'}}> {this.props.currentPage}</span>

                    {
                        <a className="pageList" style={{marginLeft:10+'px'}} href={"/view/menu/"+this.props.newsList[0].menu_id._id+"/menuType/2/page/"+(parseInt(this.props.currentPage)+1)+"/news"}  >下一页</a>
                    }*/}
                    </div>
                )
            } else if (this.props.pageObj.totalPage != 0 && this.props.currentPage == "" + this.props.pageObj.totalPage && this.props.currentPage != '1') {
                if (this.props.currentPage == i) {
                    items.push(<li className="active"><a href="#">{i}</a></li>);
                } else if (this.props.currentPage < i) {
                    items.push(<li><a style={{marginLeft: 10 * {i} + 'px'}}
                                      href={"/view/menu/" + this.props.menu[0]._id + "/menuType/2/page/" + (parseInt(this.props.currentPage) + 1) + "/news"}>{i}</a>
                    </li>);
                } else {
                    items.push(<li><a style={{marginLeft: 10 * {i} + 'px'}}
                                      href={"/view/menu/" + this.props.menu[0]._id + "/menuType/2/page/" + (parseInt(this.props.currentPage) - 1) + "/news"}>{i}</a>
                    </li>);

                }

                prePage = (

                    <div className="fenye">
                        <div className="text-center">
                            <ul className="pagination">
                                {items}
                            </ul>
                        </div>


                        {/*
                        <span className="fenyez12g fenyez1 pageList">共{
                            this.props.pageObj.totalCount
                        }条
                        </span>
                    {
                        <a  className="pageList" style={{marginLeft:10+'px'}} href={"/view/menu/"+this.props.newsList[0].menu_id._id+"/menuType/2/page/"+(parseInt(this.props.currentPage)-1)+"/news"}   >上一页</a>
                    }

                    <span className="fenyez12g pageList fenyez2 center" style={{marginLeft:10+'px'}}> {this.props.currentPage}</span>

                    {
                        <a className="pageList" style={{marginLeft:10+'px'}}  >下一页</a>
                    }*/}
                    </div>
                )
            } else {
                if (this.props.currentPage == i) {
                    items.push(<li className="active"><a href="#">{i}</a></li>);
                } else if (this.props.currentPage < i) {
                    items.push(<li><a style={{marginLeft: 10 * {i} + 'px'}}
                                      href={"/view/menu/" + this.props.menu[0]._id + "/menuType/2/page/" + (parseInt(this.props.currentPage) + 1) + "/news"}>{i}</a>
                    </li>);
                } else {
                    items.push(<li><a style={{marginLeft: 10 * {i} + 'px'}}
                                      href={"/view/menu/" + this.props.menu[0]._id + "/menuType/2/page/" + (parseInt(this.props.currentPage) - 1) + "/news"}>{i}</a>
                    </li>);

                }
                prePage = (
                    <div className="fenye">
                        <div className="text-center">
                            <ul className="pagination">
                                {items}
                            </ul>
                        </div>
                        {/* <span className="fenyez12g fenyez1 pageList">共{
                        this.props.pageObj.totalCount
                    }条
                    </span>
                    {
                        <a   className="pageList" style={{marginLeft:10+'px'}}  >上一页</a>
                    }

                    <span className="fenyez12g pageList fenyez2 center" style={{marginLeft:10+'px'}}> {this.props.currentPage}</span>

                    {
                        <a className="pageList" style={{marginLeft:10+'px'}}  >下一页</a>
                    }*/}
                    </div>
                )
            }
        }
        if (this.props.currentPage == '1') {
            pageList = (
                this.props.newsList.map((newsItem, index) =>
                    <a key={index} className="collection-item listItem" key={index}
                       href={"/view/menu/" + newsItem.menu_id._id + "/menuType/" + newsItem.menu_id.menu_type + "/page/" + (index + 1) + "/newsListDetails"}>
                        <span className='fontWeight'> > </span>{newsItem.news_title}
                        <span className="rq">{newsItem.created_at.toLocaleDateString()}</span>
                    </a>
                )
            )
        } else {
            pageList = (
                this.props.newsList.map((newsItem, index) =>
                    <a key={index} className="collection-item listItem" key={index}
                       href={"/view/menu/" + newsItem.menu_id._id + "/menuType/" + newsItem.menu_id.menu_type + "/page/" + ((index + 1) + (this.props.currentPage - 1) * 10) + "/newsListDetails"}>
                        <span className='fontWeight'> > </span>{newsItem.news_title}
                        <span className="rq">{newsItem.created_at.toLocaleDateString()}</span>
                    </a>
                )
            )
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
                                        <ul className="jididong">
                                            <li> {pageList}</li>
                                        </ul>

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



