'use strict'

import React from 'react';

import  Header from './layout/Header';
import  Footer from './layout/Footer';
export default class SearchComponent  extends React.Component {
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

                            <div className="about_word">
                                <div className="kect">
                                    <div className="mores"><a href={"/view/index"} >首页</a>&nbsp;&gt;&nbsp;
                                        高级搜索</div>
                                </div>

                                <div className="ab_neir">
                                    {
                                        this.props.newsList.map((newsItem,index) => <a className="collection-item" key={index} href={"/view/news/"+newsItem._id.toString()}>{newsItem.news_title}<span
                                            className="rq">{newsItem.created_at.toLocaleDateString()}</span></a>)
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

