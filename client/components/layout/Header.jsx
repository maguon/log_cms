'use strict'
const React = require('react')

class Header extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <nav className="one-page-header one-page-header-style-2 navbar navbar-default navbar-fixed-top"
                 role="navigation">
                <div className="container">
                    <div className="menu-container page-scroll menu-container-scroll">
                        <button type="button" className="navbar-toggle" data-toggle="collapse"
                                data-target=".navbar-ex1-collapse">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                        <a className="navbar-brand" href={"/view"}>
                            <img alt="logo" className='logo_img' src="/uploads/logo.png" />
                        </a>
                        <span className='logoTitle'>{this.props.logoTitle}</span>

                      {/*  <div className="log-reg-block-simple cd-log_reg">
                            <a className="btn-u cd-signin" href="javascript:void(0);">Login</a>
                        </div>

                        <div className="top-contact-block">
                            <i className="fa fa-phone fa-1"></i> <a href="tel:0 800 2000 123">0 800 2000 123</a>
                        </div>*/}
                    </div>

                    <div className="collapse navbar-collapse navbar-ex1-collapse">

                        <div className="menu-container">
                            <ul className="nav navbar-nav floatRight">
                                <li className="page-scroll"  ><a  href={"/"}>首页</a></li>
                                {this.props.menuList.map((menuItem, index) => {
                                    return <li className="page-scroll" key={index} ><a  href={"/view/menu/" + menuItem._id.toString() + "/menuType/" + menuItem.menu_type + "/page/1/news"}>{menuItem.menu_name}</a></li>
                                })}

                            </ul>
                        </div>
                    </div>

                </div>
            </nav>
        );
    }
}
export default (Header)