'use strict'

import React from 'react';

import  Header from './layout/Header';
import  Footer from './layout/Footer';
export default class NewsDetailsComponent  extends React.Component {
    constructor(props) {
        super(props);
    }
    render () {
        let prePage;
        if(this.props.currentPage===1){
            prePage =(
                <div className="fenPian">

                    {
                        <a   className="pageList" style={{marginLeft:10+'px'}}  >上一篇</a>
                    }


                    {
                        <a className="pageList" style={{marginLeft:10+'px'}} href={"/view/menu/"+this.props.newsList[0].menu_id._id+"/menuType/2/page/"+(parseInt(this.props.currentPage)+1)+"/newsListDetails"}  >下一篇</a>
                    }
                </div>
            )

        }
        else  if(this.props.currentPage!==1&&this.props.currentPage!== this.props.pageObj.totalCount){
            prePage =(
                <div className="fenPian">
                    {
                        <a  className="pageList" style={{marginLeft:10+'px'}} href={"/view/menu/"+this.props.newsList[0].menu_id._id+"/menuType/2/page/"+(parseInt(this.props.currentPage)-1)+"/newsListDetails"}   >上一篇</a>
                    }

                    {
                        <a className="pageList" style={{marginLeft:10+'px'}} href={"/view/menu/"+this.props.newsList[0].menu_id._id+"/menuType/2/page/"+(parseInt(this.props.currentPage)+1)+"/newsListDetails"}  >下一篇</a>
                    }
                </div>
            )
        }
        else if(this.props.currentPage=== this.props.pageObj.totalCount){
            prePage =(

                <div className="fenPian">
                    {
                        <a  className="pageList" style={{marginLeft:10+'px'}} href={"/view/menu/"+this.props.newsList[0].menu_id._id+"/menuType/2/page/"+(parseInt(this.props.currentPage)-1)+"/newsListDetails"}   >上一篇</a>
                    }

                    {
                        <a className="pageList" style={{marginLeft:10+'px'}}  >下一篇</a>
                    }
                </div>
            )
        }
        else {
            return;
        }
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
                                    <div className="mores"><a href={"/view/index"} className="black-text" >首页</a>&nbsp;&gt;&nbsp;
                                        <a className="black-text"  href={"/view/menu/"+this.props.newsList[0].menu_id._id+"/menuType/"+this.props.newsList[0].menu_id.menu_type+"/page/1/news"}>{this.props.menuName}</a></div>
                                </div>

                                <div className="ab_neir">

                                    <div className="fenPianText">
                                        {
                                            this.props.newsList.map((newsItem,index) =>
                                                <div>
                                                    <p dangerouslySetInnerHTML={{ __html: newsItem.news_content }} />

                                                </div>)
                                        }
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

