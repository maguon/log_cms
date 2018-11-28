'use strict'

import React from 'react';

import  Header from './layout/Header';
import  Footer from './layout/Footer';
export default class MenuComponent  extends React.Component {
    constructor(props) {
        super(props);
    }
    render () {
        return (
            <div>
                <Header menuList={this.props.menuList}/>
                <div className="rows">
                    <div className="collection">

                        <li>
                            <a href="frontnewsorpicinfo?nd=224" target="_blank">
                            <img alt="诚聘优秀单排轿运车驾驶员" className="hdp" />
                            </a>
                        </li>




                        {
                        this.props.menuList.map((menuItem,index) => <a className="collection-item" key={index} href={""}>{menuItem.menu_name}</a>)
                    }

                    </div>
                </div>
                <Footer/>
            </div>
        );
    }

}

