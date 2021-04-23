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
        let items = [];
        for (var i = 1; i <= this.props.pageObj.totalPage; i++) {
            if(this.props.pageObj.totalPage!==0&&this.props.currentPage==='1'&&this.props.currentPage!==  ""+this.props.pageObj.totalPage){
                if(this.props.currentPage==i){
                    items.push( <li className="active"><a href="#">{i}</a></li>);
                }
                else {
                    items.push( <li><a style={{marginLeft:10*{i}+'px'}}
                                       href={"/view/menu/"+this.props.menu[0]._id+"/menuType/2/page/"+(parseInt(this.props.currentPage)+1)+"/news"} >{i}</a></li>);
                }


                prePage =(
                    <div className="fenye">
                        <div className="text-center">
                            <ul className="pagination">
                                {items}
                            </ul>
                        </div>


                        {/*    <span className="fenyez12g fenyez1 pageList">共{
                        this.props.pageObj.totalCount
                    }条
                    </span>
                    {
                        <a   className="pageList" style={{marginLeft:10+'px'}}  >上一页</a>
                    }

                    <span className="fenyez12g pageList fenyez2 center" style={{marginLeft:10+'px'}}> {this.props.currentPage}</span>

                    {
                        <a className="pageList" style={{marginLeft:10+'px'}} href={"/view/menu/"+this.props.menu[0]._id+"/menuType/2/page/"+(parseInt(this.props.currentPage)+1)+"/news"}  >下一页</a>
                    }*/}
                    </div>
                )

            }
            else if(this.props.pageObj.totalPage!==0&&this.props.currentPage!=='1'&&this.props.currentPage!== ""+this.props.pageObj.totalPage){
                if(this.props.currentPage==i){
                    items.push( <li className="active"><a href="#">{i}</a></li>);
                }
                else if(this.props.currentPage<i){
                    items.push( <li><a style={{marginLeft:10*{i}+'px'}}
                                       href={"/view/menu/"+this.props.menu[0]._id+"/menuType/2/page/"+(parseInt(this.props.currentPage)+1)+"/news"} >{i}</a></li>);
                }
                else{
                    items.push( <li><a style={{marginLeft:10*{i}+'px'}}
                                       href={"/view/menu/"+this.props.menu[0]._id+"/menuType/2/page/"+(parseInt(this.props.currentPage)-1)+"/news"} >{i}</a></li>);

                }
                prePage =(
                    <div className="fenye">
                        <div className="text-center">
                            <ul className="pagination">
                                {items}
                            </ul>
                        </div>

                        {/* <span className="fenyez12g fenyez1 pageList">共{
                        this.props.pageObj.totalCount
                    }条
                    </span>
                    {
                        <a  className="pageList" style={{marginLeft:10+'px'}} href={"/view/menu/"+this.props.newsList[0].menu_id._id+"/menuType/2/page/"+(parseInt(this.props.currentPage)-1)+"/news"}   >上一页</a>
                    }

                    <span className="fenyez12g pageList fenyez2 center" style={{marginLeft:10+'px'}}> {this.props.currentPage}</span>

                    {
                        <a className="pageList" style={{marginLeft:10+'px'}} href={"/view/menu/"+this.props.newsList[0].menu_id._id+"/menuType/2/page/"+(parseInt(this.props.currentPage)+1)+"/news"}  >下一页</a>
                    }*/}
                    </div>
                )
            }
            else if(this.props.pageObj.totalPage!==0&&this.props.currentPage=== ""+this.props.pageObj.totalPage&&this.props.currentPage!=='1'){
                if(this.props.currentPage==i){
                    items.push( <li className="active"><a href="#">{i}</a></li>);
                }
                else if(this.props.currentPage<i){
                    items.push( <li><a style={{marginLeft:10*{i}+'px'}}
                                       href={"/view/menu/"+this.props.menu[0]._id+"/menuType/2/page/"+(parseInt(this.props.currentPage)+1)+"/news"} >{i}</a></li>);
                }
                else{
                    items.push( <li><a style={{marginLeft:10*{i}+'px'}}
                                       href={"/view/menu/"+this.props.menu[0]._id+"/menuType/2/page/"+(parseInt(this.props.currentPage)-1)+"/news"} >{i}</a></li>);

                }

                prePage =(

                    <div className="fenye">
                        <div className="text-center">
                            <ul className="pagination">
                                {items}
                            </ul>
                        </div>


                        {/*
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
                    }*/}
                    </div>
                )
            }
            else {
                if(this.props.currentPage==i){
                    items.push( <li className="active"><a href="#">{i}</a></li>);
                }
                else if(this.props.currentPage<i){
                    items.push( <li><a style={{marginLeft:10*{i}+'px'}}
                                       href={"/view/menu/"+this.props.menu[0]._id+"/menuType/2/page/"+(parseInt(this.props.currentPage)+1)+"/news"} >{i}</a></li>);
                }
                else{
                    items.push( <li><a style={{marginLeft:10*{i}+'px'}}
                                       href={"/view/menu/"+this.props.menu[0]._id+"/menuType/2/page/"+(parseInt(this.props.currentPage)-1)+"/news"} >{i}</a></li>);

                }


                prePage =(
                    <div className="fenye">
                        <div className="text-center">
                            <ul className="pagination">
                                {items}
                            </ul>
                        </div>
                        {/* <span className="fenyez12g fenyez1 pageList">共{
                        this.props.pageObj.totalCount
                    }条
                    </span>
                    {
                        <a   className="pageList" style={{marginLeft:10+'px'}}  >上一页</a>
                    }

                    <span className="fenyez12g pageList fenyez2 center" style={{marginLeft:10+'px'}}> {this.props.currentPage}</span>

                    {
                        <a className="pageList" style={{marginLeft:10+'px'}}  >下一页</a>
                    }*/}
                    </div>
                )
            }
        }



        return (
            <div>
                <Header menuList={this.props.menuList} logoTitle={this.props.logoTitle}/>
                <div className="job-img margin-bottom-30"></div>
                <div className="container content profile wrap1003">
                    <div className="row marginTop50" >
                        <div className="col-md-3 md-margin-bottom-40">
                            <ul className="list-group sidebar-nav-v1 margin-bottom-40" id="sidebar-nav-1">
                                <div className={"list-group-item menuName"}>{this.props.menu[0].menu_name}</div>
                                {
                                    this.props.twoMenuNameList.map((twoMenuNameItem,index) =>{
                                        return <li key={index} className={["list-group-item"]}>
                                            <a  key={index} href={"/view/menu/"+twoMenuNameItem._id+"/menuType/"+twoMenuNameItem.menu_type+"/page/1/news"}>{twoMenuNameItem.menu_name}</a>
                                        </li>
                                    })
                                }
                            </ul>

                        </div>
                        <div className="col-md-9">
                            <div className="kect">
                                <div className="mores"><a href="/" className="black-text" >首页</a>&nbsp;&gt;&nbsp;
                                    <a className="black-text"  href={"/view/menu/"+this.props.menu[0]._id+"/menuType/"+this.props.menu[0].menu_type+"/page/1/news"} >{this.props.menu[0].menu_name}</a></div>
                            </div>

                            <div className="profile-body">
                                <div className="row">
                                    <div className="ab_neir">
                                        <ul className="jididong">

                                            <li> {
                                                this.props.newsList.map((newsItem,index) =>
                                                    <a key={index} className="collection-item listItem" key={index} href={"/view/menu/"+newsItem.menu_id._id+"/menuType/"+newsItem.menu_id.menu_type+"/news/"+newsItem._id.toString()+"/page/1"}>
                                                        <span className='fontWeight'> > </span>{newsItem.news_title}
                                                        <span className="rq">{newsItem.created_at.toLocaleDateString()}</span>
                                                    </a>
                                                )
                                            }
                                            </li>

                                        </ul>

                                        {prePage}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer pageFooter={this.props.pageFooter}/>
            </div>
        );
    }

}



