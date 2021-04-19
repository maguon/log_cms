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

                            <div className="about_word_seach">
                                <div className="kect">
                                    <div className="mores"><a href="/" >首页</a>&nbsp;&gt;&nbsp;
                                        高级搜索</div>
                                </div>

                                <div className="ab_neir">
                                    {
                                        this.props.newsList.map((newsItem,index) =>
                                            <a key={index} className="collection-item" key={index} href={"/view/menu/"+newsItem.menu_id._id+"/menuType/"+newsItem.menu_id.menu_type+"/news/"+newsItem._id.toString()+"/page/1"}>{newsItem.news_title}<span
                                            className="rq">{newsItem.created_at.toLocaleDateString()}</span></a>)
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

