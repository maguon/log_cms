'use strict'

import React from 'react';

import  Header from './layout/Header';
import  Footer from './layout/Footer';
export default class ListComponent  extends React.Component {
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
                                    <div className="mores"><a href="index" >首页</a>&nbsp;&gt;&nbsp;
                                        <a href="frontnewsorpic?p=1&amp;md=5" >{this.props.menuName}</a></div>
                                </div>

                                <div className="ab_neir">
                                    <ul className="jididong">

                                        <li> {
                                            this.props.newsList.map((newsItem,index) => <a className="collection-item" key={index} href={"/view/news/"+newsItem._id.toString()}>{newsItem.news_title}<span
                                                className="rq">{newsItem.created_at.toLocaleDateString()}</span></a>)
                                        }
                                        </li>

                                    </ul>

                                    <div className="fenye">
                                        <span className="fenyez12g fenyez1">共10条</span>

                                        <span className="fenyez12g fenyez1">上一页</span>

                                        <span className="fenyez12g fenyez2">1</span>

                                        <span className="fenyez12g fenyez1">下一页</span>


                                    </div>
                                </div>
                            </div>
                        </div>

                </div>
                <Footer/>
            </div>
            </div>
        );
    }

}

