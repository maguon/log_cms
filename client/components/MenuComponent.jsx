'use strict'

import React from 'react';

import  Header from './layout/Header';

export default class MenuComponent  extends React.Component {
    constructor(props) {
        super(props);
    }
    render () {

        return (
            <div>
                <Header menuList={this.props.menuList} logoTitle={this.props.logoTitle}/>
                <section id="intro" className="intro-section">
                    <div className="fullscreenbanner-container">
                        <div className="fullscreenbanner">
                            <ul>
                                {this.props.newsList.map((newsItem, index) =>
                                    <li key={index} data-transition="curtain-1" data-slotamount="5" data-masterspeed="700">
                                        <img src={newsItem.news_image} alt={newsItem.news_title} data-bgfit="cover"
                                             data-bgposition="center center" data-bgrepeat="no-repeat"/>

                                        <div className="tp-caption rs-caption-1 sft start"
                                             data-x="center"
                                             data-hoffset="0"
                                             data-y="100"
                                             data-speed="800"
                                             data-start="2000"
                                             data-easing="Back.easeInOut"
                                             data-endspeed="300">
                                            { newsItem.news_title}
                                        </div>
                                        <div className="tp-caption rs-caption-2 sft"
                                             data-x="center"
                                             data-hoffset="0"
                                             data-y="200"
                                             data-speed="1000"
                                             data-start="3000"
                                             data-easing="Power4.easeOut"
                                             data-endspeed="300"
                                             data-endeasing="Power1.easeIn"
                                             data-captionhidden="off">
                                            { newsItem.news_content}
                                        </div>


                                        <div className="tp-caption rs-caption-3 sft"
                                             data-x="center"
                                             data-hoffset="0"
                                             data-y="360"
                                             data-speed="800"
                                             data-start="3500"
                                             data-easing="Power4.easeOut"
                                             data-endspeed="300"
                                             data-endeasing="Power1.easeIn"
                                             data-captionhidden="off">
                                        </div>
                                    </li>
                                )}
                            </ul>
                            <div className="tp-bannertimer tp-bottom"></div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }

}

