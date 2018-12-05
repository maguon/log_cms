'use strict'

import React from 'react';

import  Header from './layout/Header';
import  Footer from './layout/Footer';
export default class NewsDetailsComponent  extends React.Component {
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
                                        <a className="black-text"  href="">{this.props.menuName}</a></div>
                                </div>

                                <div className="ab_neir">


                                    {
                                        this.props.newsList.map((newsItem,index) =>
                                            <div>
                                                <p dangerouslySetInnerHTML={{ __html: newsItem.news_content }} />

                                            </div>)
                                    }

                                    {
                                        <a className="pageList" style={{marginLeft:10+'px'}} href={"/view/menu/"+this.props.newsList[0].menu_id._id+"/menuType/2/page/"+(parseInt(this.props.currentPage)-1)+"/newsListDetails"} >上一篇</a>
                                    }
                                    {
                                        <a className="pageList" style={{marginLeft:10+'px'}} href={"/view/menu/"+this.props.newsList[0].menu_id._id+"/menuType/2/page/"+(parseInt(this.props.currentPage)+1)+"/newsListDetails"}  >下一篇</a>
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

