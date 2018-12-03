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
                        <div className="wrap1003">
                            <div className="ab_huod">
                                <div className="ab_huod_tit">{this.props.menuName}</div>
                                <ul className="ab_huod_fenlei" id="treeDemo">
                                    <li className="level0 treeDemo">
                                        <a  className="level0" onClick=""  href="">港口运输场地 </a>
                                    </li>
                                    <li className="level0 treeDemo">
                                        <a  className="level0" onClick=""  href="">车辆运输场地 </a>
                                    </li>
                                    <li className="level0 treeDemo">
                                        <a  className="level0" onClick=""  href="">仓储场地 </a>
                                    </li>
                                </ul>
                            </div>
                            <div className="about_word">
                                <div className="kect">
                                    <div className="mores"><a href="index" >首页</a>&nbsp;&gt;&nbsp;
                                        <a href={"/view/menu/"+this.props.newsList[0].menu_id._id+"/menuType/"+this.props.newsList[0].menu_id.menu_type+"/page/1/size/5/news"}>{this.props.menuName}</a></div>
                                </div>

                                <div className="ab_neir1">

                                    {
                                        this.props.newsImageList.map((imageItem,index) =>
                                            <a  key={index} href={"/view/news/"+imageItem._id.toString()}>
                                                <img className="ab_neir_img" src={"http://stg.myxxjs.com:9002/api/image/"+imageItem.news_image} /></a>)
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

