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
                                            this.props.newsList.map((newsItem,index) => <a className="collection-item" key={index} href={"/view/news/"+newsItem._id.toString()}>{newsItem.news_title}<span
                                                className="rq">{newsItem.created_at.toLocaleDateString()}</span></a>)
                                        }
                                        </li>

                                    </ul>

                                    <div className="fenye">

                                         <span className="fenyez12g fenyez1">共{
                                             this.props.pageObj.totalCount
                                         }条&nbsp;
                                             共{
                                                 this.props.pageObj.totalPage =  Math.ceil(this.props.pageObj.totalCount/this.props.pageObj.pageSize)
                                             }页&nbsp;
                                             当前第{
                                                 this.props.currentPage
                                             }页&nbsp;
                                             每页{
                                                 this.props.pageObj.pageSize
                                             }条&nbsp;

                                        </span>


                                        {
                                            <a className="" href={"/view/menu/"+this.props.newsList[0].menu_id+"/menuType/2/page/"+(this.props.pageObj.pageIndex=(this.props.pageObj.pageIndex===1)?1:(this.props.pageObj.pageIndex=this.props.currentPage-1))+"/size/"+   this.props.pageObj.pageSize  +"/news"}   >上一页</a>
                                        }

                                        <span className="fenyez12g fenyez2"> {this.props.pageObj.pageIndex}/{Math.ceil(this.props.pageObj.totalCount/this.props.pageObj.pageSize)}</span>

                                        {
                                            <a className="" href={"/view/menu/"+this.props.newsList[0].menu_id+"/menuType/2/page/"+(parseInt(this.props.currentPage)+1)+"/news"}  >下一页</a>
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

