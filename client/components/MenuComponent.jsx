'use strict'

import React from 'react';


export default class MenuComponent  extends React.Component {
    constructor(props) {
        super(props);
    }
    render () {
        return (
            <div>

                <div className="rows">
                    <div className="collection">
                    {
                        this.props.menuList.map((menuItem,index) => <a className="collection-item" key={index} href={""}>{menuItem.menu_name}</a>)
                    }</div>
                </div>

            </div>
        );
    }

}

