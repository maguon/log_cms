'use strict'

import React from 'react';

import  Header from './layout/Header';
import  Footer from './layout/Footer';
export default class PictureDetailsComponent  extends React.Component {
    constructor(props) {
        super(props);
    }
    render () {
        let prePage;
        if(this.props.currentPage==='1'&&this.props.currentPage!==  ""+this.props.pageObj.totalCount){
            prePage =(
                <div className="pageItem">

                    {
                        <a   className="pageList" style={{marginLeft:10+'px'}}  >上一篇</a>
                    }


                    {
                        <a className="pageList" style={{marginLeft:10+'px'}}  href={"/view/menu/"+this.props.newsList[0].menu_id._id+"/menuType/"+this.props.newsList[0].menu_id.menu_type+"/page/"+(parseInt(this.props.currentPage)+1)+"/pictureDetails"} >下一篇</a>
                    }
                </div>
            )

        }
        else  if(this.props.currentPage!=='1'&&this.props.currentPage!==  ""+this.props.pageObj.totalCount){
            prePage =(
                <div className="pageItem">
                    {
                        <a  className="pageList" style={{marginLeft:10+'px'}}   href={"/view/menu/"+this.props.newsList[0].menu_id._id+"/menuType/"+this.props.newsList[0].menu_id.menu_type+"/page/"+(parseInt(this.props.currentPage)-1)+"/pictureDetails"}  >上一篇</a>
                    }

                    {
                        <a className="pageList" style={{marginLeft:10+'px'}}  href={"/view/menu/"+this.props.newsList[0].menu_id._id+"/menuType/"+this.props.newsList[0].menu_id.menu_type+"/page/"+(parseInt(this.props.currentPage)+1)+"/pictureDetails"}>下一篇</a>
                    }
                </div>
            )
        }
        else if(this.props.currentPage=== ""+this.props.pageObj.totalCount&&this.props.currentPage!=='1'){
            prePage =(

                <div className="pageItem">
                    {
                        <a  className="pageList" style={{marginLeft:10+'px'}}   href={"/view/menu/"+this.props.newsList[0].menu_id._id+"/menuType/"+this.props.newsList[0].menu_id.menu_type+"/page/"+(parseInt(this.props.currentPage)-1)+"/pictureDetails"}   >上一篇</a>
                    }

                    {
                        <a className="pageList" style={{marginLeft:10+'px'}}  >下一篇</a>
                    }
                </div>
            )
        }
        else {
            prePage =(

                <div className="pageItem">
                    {
                        <a   className="pageList" style={{marginLeft:10+'px'}}  >上一篇</a>
                    }

                    {
                        <a className="pageList" style={{marginLeft:10+'px'}}  >下一篇</a>
                    }
                </div>
            )
        }



        let twoMenuName;
        if(this.props.newsList.length===0){
            twoMenuName = "";
        }else if(this.props.newsList[0].menu_id.menu_pid!=='-1'){
            twoMenuName =(
                <a className="black-text"   href={"/view/menu/"+this.props.newsList[0].menu_id._id+"/menuType/"+this.props.newsList[0].menu_id.menu_type+"/page/1/news"}>&nbsp;&gt;&nbsp;{this.props.newsList[0].menu_id.menu_name}</a>
            )
        }else{
            twoMenuName = "";
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
                                    <div className="mores">
                                        <a href={"/view/index"} className="black-text" >首页</a>&nbsp;&gt;&nbsp;
                                        <a className="black-text"  href={"/view/menu/"+this.props.menu[0]._id+"/menuType/"+this.props.menu[0].menu_type+"/page/1/news"}>{this.props.menu[0].menu_name}</a>
                                        {twoMenuName}
                                    </div>

                                </div>

                                <div className="">
                                    <div className="pictureText">
                                        <img className="pictureImg" src={"http://stg.myxxjs.com:9002/api/image/"+this.props.newsList[0].news_image} />
                                        <p className="center-align" style={{marginBottom:20+'px'}}>{this.props.newsList[0].news_title}</p>
                                        <p className="picture" dangerouslySetInnerHTML={{ __html: this.props.newsList[0].news_content }}  />

                                    </div>
                                    {prePage}
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

