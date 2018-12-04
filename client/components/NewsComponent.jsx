'use strict'

import React from 'react';

import  Header from './layout/Header';
import  Footer from './layout/Footer';
export default class NewsComponent  extends React.Component {
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
                                        <a className="black-text"  href={"/view/menu/"+this.props.newsList[0].menu_id._id+"/menuType/"+this.props.newsList[0].menu_id.menu_type+"/page/1/size/5/news"}>{this.props.menuName}</a></div>
                                </div>

                                <div className="ab_neir">


                                    {
                                        this.props.newsList.map((newsItem,index) =>
                                            <div>
                                                  {  <img src={"http://stg.myxxjs.com:9002/api/image/"+newsItem.news_image} />}
                                                <p>{ newsItem.news_title }</p>
                                                <p dangerouslySetInnerHTML={{ __html: newsItem.news_content }} />

                                            </div>)
                                    }

                                    <span className="fenyez12g fenyez1">上一篇</span>
                                    <span className="fenyez12g fenyez1"
                                          onClick="location.href='findnewsbypage?nd=240&amp;md=5&amp;prenext=2'">下一篇</span>

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

