'use strict'

import React from 'react';

import  Header from './layout/Header';
import  Footer from './layout/Footer';
export default class PictureDetailsComponent  extends React.Component {
    constructor(props) {
        super(props);
    }
    render () {

        return (
            <div>
                <Header menuList={this.props.menuList}/>
                <div className="rows">
                    <div className="collection">
                        <div className="wrap1003">
                            <div className="ab_huod">
                                <div className="ab_huod_tit">{this.props.menu[0].menu_name}</div>
                                <ul className="ab_huod_fenlei" id="treeDemo">
                                    {
                                        this.props.twoMenuNameList.map((twoMenuNameItem,index) =>
                                            <li className="level0 treeDemo">
                                                <a className="level0" key={index} href={"/view/menu/"+twoMenuNameItem._id+"/menuType/"+twoMenuNameItem.menu_type+"/page/1/news"}>{twoMenuNameItem.menu_name}</a>
                                            </li>)
                                    }
                                </ul>
                            </div>
                            <div className="about_word">
                                <div className="kect">
                                    <div className="mores"><a href={"/view/index"} className="black-text" >首页</a>&nbsp;&gt;&nbsp;
                                        <a className="black-text"  href={"/view/menu/"+this.props.newsList[0].menu_id._id+"/menuType/"+this.props.newsList[0].menu_id.menu_type+"/page/1/news"}>{this.props.menu[0].menu_name}</a></div>
                                </div>

                                <div className="">
                                    <div className="pictureText">
                                        <img className="pictureImg" src={"http://stg.myxxjs.com:9002/api/image/"+this.props.newsList[0].news_image} />
                                        <p className="center-align" style={{marginBottom:20+'px'}}>{this.props.newsList[0].news_title}</p>
                                        <p className="picture" dangerouslySetInnerHTML={{ __html: this.props.newsList[0].news_content }}  />

                                    </div>
                                    <div className="pageItem">
                                    {
                                        <a style={{marginLeft:10+'px'}} href="" >上一篇</a>
                                    }
                                    {
                                        <a style={{marginLeft:10+'px'}} href=""  >下一篇</a>
                                    }
                                    </div>
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

