'use strict'

import React from 'react';

import  Header from './layout/Header';
import  Footer from './layout/Footer';
export default class PictureComponent  extends React.Component {
    constructor(props) {
        super(props);
    }
    render () {
        return (
            <div>
                <Header menuList={this.props.menuList}/>
                <div className="rows">
                    <div className="collection">
                        {
                            this.props.newsImageList.map((imageItem,index) =>
                                <a className="collection-item" key={index} href={"/view/news/"+imageItem._id.toString()}>
                                    <img src={"http://stg.myxxjs.com:9002/api/image/"+imageItem.news_image} /></a>)
                        }

                        </div>
                </div>
                <Footer profileList={this.props.profileList} recruitList={this.props.recruitList} contactList={this.props.contactList} />
            </div>
        );
    }

}

