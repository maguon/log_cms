'use strict'

import React from 'react';
import Header from './layout/Header';
import Footer from './layout/Footer';

export default class IndexComponent  extends React.Component {
    constructor(props) {
        super(props);
    }
    render () {
        return (
            <div style={{height:'100%'}}>
                {/* 项目 Header */}
                <Header menuList={this.props.menuList}/>

                {/* 轮播图片 */}
                <div id="menu0" className="pushpin example" data-target="menu0">
                    <div className="row" style={{marginBottom:'0'}}>

                        <div className="slider">
                            <ul className="slides">
                                {this.props.newsList.map((newsItem, index) =>
                                    <li key={index} >
                                        <img src={newsItem.news_image} alt={newsItem.news_title}/>
                                        <div className="caption right-align">
                                            <h4 style={{color:'#0A4454'}}>{newsItem.news_title}</h4>
                                            <h6 style={{color:'#0A4454'}}>{newsItem.news_content}</h6>
                                        </div>
                                    </li>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>



                {/* 项目 Footer */}
                <Footer recruitList={this.props.recruitList} contactList={this.props.contactList}/>
            </div>
        );
    }
}