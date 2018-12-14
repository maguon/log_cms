'use strict'

import React from 'react';

import  Header from './layout/Header';
import  Footer from './layout/Footer';
export default class PictureComponent  extends React.Component {
    constructor(props) {
        super(props);
    }
    render () {
        let twoMenuName;
        if(this.props.newsList.length===0){
            twoMenuName = "";
        }else if(this.props.newsList[0].menu_id.menu_pid!=='-1'){
            twoMenuName =(
                <a className="black-text" href={"/view/menu/"+this.props.newsList[0].menu_id._id+"/menuType/"+this.props.newsList[0].menu_id.menu_type+"/page/1/news"}>&nbsp;&gt;&nbsp;{this.props.newsList[0].menu_id.menu_name}</a>
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
                                        <a href={"/view/index"} className="black-text">首页</a>&nbsp;&gt;&nbsp;
                                        <a className="black-text" href={"/view/menu/"+this.props.menu[0]._id+"/menuType/"+this.props.menu[0].menu_type+"/page/1/news"}>{this.props.menu[0].menu_name}</a>
                                        {twoMenuName}
                                    </div>
                                </div>

                                <div className="ab_neir1">

                                    {
                                        this.props.newsList.map((imageItem,index) =>
                                            <a  key={index} href={"/view/menu/"+imageItem.menu_id._id+"/menuType/"+imageItem.menu_id.menu_type+"/picture/"+imageItem._id.toString()+"/page/1"}>
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

