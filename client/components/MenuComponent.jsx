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
                <Header/>
                <div className="rows">
                    <div className="collection">
                    {
                        this.props.menuList.map((menuItem,index) => <a className="collection-item" key={index} href={"/view/news"}>{menuItem.menu_name}</a>)
                    }</div>
                </div>
                <Footer/>
            </div>
        );
    }

}

