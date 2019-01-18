


'use strict'
const React = require('react')

class Header extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        return (
            <div className="nav-wrapper">
                <div className="row shuntong">
                    <div className="col s12 m4 l3" id="nav_bg">

                        <div className="logoimg col s4 offset-s1">
                            <a href={"/view/index"} className="col s12">
                                <img alt="logo" src="/backend/assets/images/logo.png"  id="logo_img"/>
                            </a>
                        </div>

                        <div className="nav_ce col s7">
                            <ul className="tree_1 col s12">
                                {
                                    this.props.menuList.map((menuItem,index) => <li className='nav_block col'><a className="collection-item white-text"  key={index} href={"/view/menu/"+menuItem._id.toString()+"/menuType/"+menuItem.menu_type+"/page/1/news"}>{menuItem.menu_name}</a></li>)
                                }
                            </ul>
                        </div>

                    </div>
                </div>

                <div className="row hongli">
                    <div className="col s12 m4 l3" id="nav_bg">

                        <div className="logoimg col s4 offset-s1">
                            <a href="javascript:void(0)" className="col s12">
                                <img alt="logo" className='logo_img' src="/backend/assets/images/honglilogo.png" />
                            </a>
                        </div>

                        <div className="nav_ce col s7">
                            <ul className="tree_1 col s12">
                                {
                                    this.props.menuList.map((menuItem,index) => <li className='nav_block col'><a className="collection-item white-text" name="menuHongLi" id='menuHongLi' key={index} href={"#menu"+index}>{menuItem.menu_name}</a></li>)
                                }
                            </ul>
                        </div>

                    </div>
                </div>
            </div>

        );
    }
}
export default (Header)