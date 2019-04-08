'use strict'

import React from 'react';

import  Header from './layout/Header';
import  Footer from './layout/Footer';

export default class ListComponent  extends React.Component {
    constructor(props) {
        super(props);
    }


    render () {
        let prePage;
        console.log(this.props.pageObj.totalPage);
        if(this.props.pageObj.totalPage!==0&&this.props.currentPage==='1'&&this.props.currentPage!==  ""+this.props.pageObj.totalPage){
            prePage =(
                <div className="fenye">

                    <span className="fenyez12g fenyez1 pageList">共{
                        this.props.pageObj.totalCount
                    }条
                    </span>
                    {
                        <a   className="pageList" style={{marginLeft:10+'px'}}  >上一页</a>
                    }

                    <span className="fenyez12g pageList fenyez2 center" style={{marginLeft:10+'px'}}> {this.props.currentPage}</span>

                    {
                        <a className="pageList" style={{marginLeft:10+'px'}} href={"/view/menu/"+this.props.menu[0]._id+"/menuType/2/page/"+(parseInt(this.props.currentPage)+1)+"/news"}  >下一页</a>
                    }
                </div>
            )

        }
        else if(this.props.pageObj.totalPage!==0&&this.props.currentPage!=='1'&&this.props.currentPage!== ""+this.props.pageObj.totalPage){
            prePage =(
                <div className="fenye">

                    <span className="fenyez12g fenyez1 pageList">共{
                        this.props.pageObj.totalCount
                    }条
                    </span>
                    {
                        <a  className="pageList" style={{marginLeft:10+'px'}} href={"/view/menu/"+this.props.newsList[0].menu_id._id+"/menuType/2/page/"+(parseInt(this.props.currentPage)-1)+"/news"}   >上一页</a>
                    }

                    <span className="fenyez12g pageList fenyez2 center" style={{marginLeft:10+'px'}}> {this.props.currentPage}</span>

                    {
                        <a className="pageList" style={{marginLeft:10+'px'}} href={"/view/menu/"+this.props.newsList[0].menu_id._id+"/menuType/2/page/"+(parseInt(this.props.currentPage)+1)+"/news"}  >下一页</a>
                    }
                </div>
            )
        }
        else if(this.props.pageObj.totalPage!==0&&this.props.currentPage=== ""+this.props.pageObj.totalPage&&this.props.currentPage!=='1'){
            prePage =(

                <div className="fenye">

                        <span className="fenyez12g fenyez1 pageList">共{
                            this.props.pageObj.totalCount
                        }条
                        </span>
                    {
                        <a  className="pageList" style={{marginLeft:10+'px'}} href={"/view/menu/"+this.props.newsList[0].menu_id._id+"/menuType/2/page/"+(parseInt(this.props.currentPage)-1)+"/news"}   >上一页</a>
                    }

                    <span className="fenyez12g pageList fenyez2 center" style={{marginLeft:10+'px'}}> {this.props.currentPage}</span>

                    {
                        <a className="pageList" style={{marginLeft:10+'px'}}  >下一页</a>
                    }
                </div>
            )
        }
        else {
            prePage =(
                <div className="fenye">

                    <span className="fenyez12g fenyez1 pageList">共{
                        this.props.pageObj.totalCount
                    }条
                    </span>
                    {
                        <a   className="pageList" style={{marginLeft:10+'px'}}  >上一页</a>
                    }

                    <span className="fenyez12g pageList fenyez2 center" style={{marginLeft:10+'px'}}> {this.props.currentPage}</span>

                    {
                        <a className="pageList" style={{marginLeft:10+'px'}}  >下一页</a>
                    }
                </div>
            )
        }
        return (
            <div>
                <Header menuList={this.props.menuList}/>
                <div className="rows">
                    <div className="collection">

                        <div className="wrap1003">
                            <div className="ab_huod">
                                <div className="ab_huod_tit">{this.props.menu[0].menu_name}</div>

                                <ul className="ab_huod_fenlei" id="treeDemo">
                                    {
                                        this.props.twoMenuNameList.map((twoMenuNameItem,index) =>
                                            <li className="level0 treeDemo">
                                                <a className="level0" key={index} href={"/view/menu/"+twoMenuNameItem._id+"/menuType/"+twoMenuNameItem.menu_type+"/page/1/news"}>{twoMenuNameItem.menu_name}</a>
                                            </li>)
                                    }
                                </ul>



                            </div>
                            <div className="about_word">
                                <div className="kect">
                                    <div className="mores"><a href="index" className="black-text">首页</a>&nbsp;&gt;&nbsp;
                                        <a href={"/view/menu/"+this.props.menu[0]._id+"/menuType/"+this.props.menu[0].menu_type+"/page/1/news"} className="black-text" >{this.props.menu[0].menu_name}</a></div>
                                </div>

                                <div className="ab_neir">
                                    <ul className="jididong">

                                        <li> {
                                            this.props.newsList.map((newsItem,index) =>
                                                <a className="collection-item" key={index} href={"/view/menu/"+newsItem.menu_id._id+"/menuType/"+newsItem.menu_id.menu_type+"/news/"+newsItem._id.toString()+"/page/1"}>{newsItem.news_title}
                                                    <span className="rq">{newsItem.created_at.toLocaleDateString()}</span>
                                                </a>)
                                        }
                                        </li>

                                    </ul>

                                    {prePage}
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

