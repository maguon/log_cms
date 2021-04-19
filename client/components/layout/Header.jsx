'use strict'
const React = require('react')

class Header extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="nav-wrapper">
                <div className="row" style={{margin:0}}>
                    <nav className="nav_bg left-align">
                        <div className="nav-wrapper">
                            <a href={"/view/mingyuan"}>
                                <img alt="logo" className='logo_img' style={{marginLeft:'50px'}} src="/backend/assets/images/mingyuanlogo.png" />
                            </a>
                            <a href="#" data-target="mobile-demo" className="sidenav-trigger black-text"><i className="mdi mdi-menu mdi-36px"/></a>
                            <ul className="right hide-on-med-and-down black-text">
                                {this.props.menuList.map((menuItem, index) => {
                                    return <li key={index} ><a  className="black-text" href={"/view/menu/" + menuItem._id.toString() + "/menuType/" + menuItem.menu_type + "/page/1/news"}>{menuItem.menu_name}</a></li>
                                })}
                            </ul>
                        </div>
                    </nav>

                    <ul className="sidenav left-align" id="mobile-demo">
                        {this.props.menuList.map((menuItem, index) => {
                            return <li key={index} ><a className="sidenav-close" href={"/view/menu/" + menuItem._id.toString() + "/menuType/" + menuItem.menu_type + "/page/1/news"}>{menuItem.menu_name}</a></li>
                        })}
                    </ul>
                </div>
            </div>

        );
    }
}
export default (Header)