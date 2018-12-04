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
                                <div className="ab_huod_tit">{this.props.menuName}</div>
                            </div>
                            <div className="about_word">
                                <div className="kect">
                                    <div className="mores"><a href={"/view/index"} className="black-text" >首页</a>&nbsp;&gt;&nbsp;
                                        <a className="black-text"  href={"/view/menu/"+this.props.newsList[0].menu_id._id+"/menuType/"+this.props.newsList[0].menu_id.menu_type+"/page/1/news"}>{this.props.menuName}</a></div>
                                </div>

                                <div className="ab_neir">
                                    <div>
                                        <img src={"http://stg.myxxjs.com:9002/api/image/"+this.props.newsList[0].news_image} />
                                        <p>{this.props.newsList[0].news_title}</p>
                                        <p dangerouslySetInnerHTML={{ __html: this.props.newsList[0].news_content }} />

                                    </div>
                                    {
                                        <a id="page" className="pageList" style={{marginLeft:10+'px'}} href={"/view/menu/"+this.props.newsList[0].menu_id._id+"/picture/"+this.props.newsList[0]._id+"/page/"+(parseInt(this.props.currentPage)-1)} >上一篇</a>
                                    }
                                    {
                                        <a className="pageList" style={{marginLeft:10+'px'}} href={"/view/menu/"+this.props.newsList[0].menu_id._id+"/picture/"+this.props.newsList[0]._id+"/page/"+(parseInt(this.props.currentPage)+1)}  >下一篇</a>
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

