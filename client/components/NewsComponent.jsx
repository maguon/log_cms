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
                <Header/>
                <div className="rows">
                    <div className="collection">
                        {
                            this.props.newsList.map((newsItem,index) => <a className="collection-item" key={index} href={"/view/news/"+newsItem._id.toString()}>{newsItem.news_title}</a>)
                        }</div>
                </div>
                <Footer/>
            </div>
        );
    }

}

