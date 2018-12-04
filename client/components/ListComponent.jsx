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
                                        <a href="#" >{this.props.menuName}</a></div>
                                </div>

                                <div className="ab_neir">
                                    <ul className="jididong">

                                        <li> {
                                            this.props.newsList.map((newsItem,index) =>
                                                <a className="collection-item" key={index} href={"/view/news/"+newsItem._id.toString()}>{newsItem.news_title}
                                                    <span className="rq">{newsItem.created_at.toLocaleDateString()}</span>
                                                </a>)
                                        }
                                        </li>

                                    </ul>

                                    <div className="fenye">

                                         <span className="fenyez12g fenyez1 pageList">共{
                                             this.props.pageObj.totalCount
                                         }条
                                        </span>

                                        {
                                            <a className="pageList" style={{marginLeft:10+'px'}} href={"/view/menu/"+this.props.newsList[0].menu_id._id+"/menuType/2/page/"+(parseInt(this.props.currentPage)-1)+"/news"}   >上一页</a>
                                        }

                                        <span className="fenyez12g pageList fenyez2 center" style={{marginLeft:10+'px'}}> {this.props.currentPage}</span>

                                        {
                                            <a className="pageList" style={{marginLeft:10+'px'}} href={"/view/menu/"+this.props.newsList[0].menu_id._id+"/menuType/2/page/"+(parseInt(this.props.currentPage)+1)+"/news"}  >下一页</a>
                                        }

                                    </div>
                                </div>
                            </div>
                        </div>

                </div>
                <Footer contactList={this.props.contactList} recruitList={this.props.recruitList} profileList={this.props.profileList} />
            </div>
            </div>
        );
    }

}

