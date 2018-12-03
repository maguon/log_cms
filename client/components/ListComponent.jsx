'use strict'

import React from 'react';

import  Header from './layout/Header';
import  Footer from './layout/Footer';
const listData = [{
    key:"001",
    idd:"001",
    title:"webstorm连接github，方便的管理仓库",
    time:"2016-12-01",
    tag:" git ",
    contents:"66666666666666！"
}] //等等等多条数据

export default class ListComponent  extends React.Component {
    constructor(props) {
        super(props);
        this.pageNext=this.pageNext.bind(this);
        this.setPage=this.setPage.bind(this);
        this.state = {
            indexList:[],//当前渲染的页面数据
            totalData:listData,
            current: 1, //当前页码
            pageSize:4, //每页显示的条数
            goValue:0,  //要去的条数index
            totalPage:0,//总页数
        };

    }

    componentWillMount(){
        //设置总页数
        this.setState({
            totalPage:Math.ceil( this.state.totalData.length/this.state.pageSize),
        })
        this.pageNext(this.state.goValue)

    }

    //设置内容
    setPage(num){
        this.setState({
            indexList:this.state.totalData.slice(num,num+this.state.pageSize)
        })
    }


    pageNext (num) {
        this.setPage(num)
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
                                        <a href={"/view/menu/"+this.props.newsList[0].menu_id._id+"/menuType/"+this.props.newsList[0].menu_id.menu_type+"/page/1/size/5/news"} >{this.props.menuName}</a></div>
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
                                            this.props.pageObj.totalPage
                                        }页&nbsp;
                                        当前第{
                                            this.props.pageObj.pageIndex
                                        }页&nbsp;
                                        每页{
                                            this.props.pageObj.pageSize
                                        }条&nbsp;

                                        </span>

                                        {
                                            <a className="" href={"/view/menu/"+this.props.newsList[0].menu_id+"/menuType/2/page/1/size/5/news"}>上一页</a>
                                        }

                                        <span className="fenyez12g fenyez2">1</span>

                                        {
                                            <a className="" href={"/view/menu/"+this.props.newsList[0].menu_id+"/menuType/2/page/2/size/5/news"}>下一页</a>
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

