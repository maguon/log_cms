'use strict'
const React = require('react')

class Header extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        return (
            <div className="nav-wrapper">
                <div className="row">
                    <div className="col s12 m10 offset-m1">

                        <div id="nav_bg" className="col s12">
                            <div className="logoimg col s5">
                                <a href="#" className="col s12">
                                    <img alt="logo" src="/backend/assets/images/logo.png"  id="logo_img"/>
                                </a>
                            </div>

                            <div className="nav_ce col s7">
                                <ul className="tree_1 col s12" id="menu2">
                                    <li className='nav_block col s1'><a className="collection-item white-text" href='menu'>首页 </a></li>
                                     {
                                        this.props.menuList.map((menuItem,index) => <li className='nav_block col s1'><a className="collection-item white-text"  key={index} href={"/view/menu/"+menuItem._id.toString()+"/news"}>{menuItem.menu_name}</a></li>)
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}
export default (Header)
