'use strict'
const React = require('react')

class Header extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let Item=[];
        for(let i=0;i<this.props.menuList.length;i++){
            if(this.props.menuList[i].menu_link!=""&&this.props.menuList[i].menu_link!=null){
                Item.push(<li className="page-scroll" key={i} ><a  href={this.props.menuList[i].menu_link}>{this.props.menuList[i].menu_name}</a></li>
                )
            }else {
                Item.push(<li className="page-scroll" key={i} ><a  href={"/view/menu/" + this.props.menuList[i]._id.toString() + "/menuType/" + this.props.menuList[i].menu_type + "/page/1/news"}>{this.props.menuList[i].menu_name}</a></li>
                )
            }
        }


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
                        <a className="navbar-brand" href={"/"}>
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
                                {Item}
                            </ul>
                        </div>
                    </div>

                </div>
            </nav>
            /*  <li className="dropdown-submenu">
           <a href="javascript:void(0);">Email Templates</a>
           <ul className="dropdown-menu">
               <li className="dropdown-submenu">
                   <a href="javascript:void(0);">Email Corporate</a>
                   <ul className="dropdown-menu">
                       <li><a target="_blank" href="Email-Templates/corporate/email_corporate_aqua.html">Corporate Aqua
                           Color</a></li>
                       <li><a target="_blank" href="Email-Templates/corporate/email_corporate_blue.html">Corporate Blue
                           Color</a></li>
                       <li><a target="_blank" href="Email-Templates/corporate/email_corporate_brown.html">Corporate
                           Brown Color</a></li>
                       <li><a target="_blank" href="Email-Templates/corporate/email_corporate_dark_blue.html">Corporate
                           Dark Blue Color</a></li>
                       <li><a target="_blank" href="Email-Templates/corporate/email_corporate_green.html">Corporate
                           Green Color</a></li>
                       <li><a target="_blank" href="Email-Templates/corporate/email_corporate_light_green.html">Corporate
                           Light Green Color</a></li>
                       <li><a target="_blank" href="Email-Templates/corporate/email_corporate_grey.html">Corporate Grey
                           Color</a></li>
                       <li><a target="_blank" href="Email-Templates/corporate/email_corporate_orange.html">Corporate
                           Orange Color</a></li>
                       <li><a target="_blank" href="Email-Templates/corporate/email_corporate_purple.html">Corporate
                           Purple Color</a></li>
                       <li><a target="_blank" href="Email-Templates/corporate/email_corporate_red.html">Corporate Red
                           Color</a></li>
                   </ul>
               </li>
               <li className="dropdown-submenu">
                   <a href="javascript:void(0);">Email Flat</a>
                   <ul className="dropdown-menu">
                       <li><a target="_blank" href="Email-Templates/flat/email_flat_aqua.html">Flat Aqua Color</a></li>
                       <li><a target="_blank" href="Email-Templates/flat/email_flat_blue.html">Flat Blue Color</a></li>
                       <li><a target="_blank" href="Email-Templates/flat/email_flat_brown.html">Flat Brown Color</a>
                       </li>
                       <li><a target="_blank" href="Email-Templates/flat/email_flat_dark_blue.html">Flat Dark Blue
                           Color</a></li>
                       <li><a target="_blank" href="Email-Templates/flat/email_flat_green.html">Flat Green Color</a>
                       </li>
                       <li><a target="_blank" href="Email-Templates/flat/email_flat_light_green.html">Flat Light Green
                           Color</a></li>
                       <li><a target="_blank" href="Email-Templates/flat/email_flat_grey.html">Flat Grey Color</a></li>
                       <li><a target="_blank" href="Email-Templates/flat/email_flat_orange.html">Flat Orange Color</a>
                       </li>
                       <li><a target="_blank" href="Email-Templates/flat/email_flat_purple.html">Flat Purple Color</a>
                       </li>
                       <li><a target="_blank" href="Email-Templates/flat/email_flat_red.html">Flat Red Color</a></li>
                   </ul>
               </li>
               <li className="dropdown-submenu">
                   <a href="javascript:void(0);">Email Modern</a>
                   <ul className="dropdown-menu">
                       <li><a target="_blank" href="Email-Templates/modern/email_modern_aqua.html">Modern Aqua
                           Color</a></li>
                       <li><a target="_blank" href="Email-Templates/modern/email_modern_blue.html">Modern Blue
                           Color</a></li>
                       <li><a target="_blank" href="Email-Templates/modern/email_modern_brown.html">Modern Brown
                           Color</a></li>
                       <li><a target="_blank" href="Email-Templates/modern/email_modern_dark_blue.html">Modern Dark
                           Blue Color</a></li>
                       <li><a target="_blank" href="Email-Templates/modern/email_modern_green.html">Modern Green
                           Color</a></li>
                       <li><a target="_blank" href="Email-Templates/modern/email_modern_light_green.html">Modern Light
                           Green Color</a></li>
                       <li><a target="_blank" href="Email-Templates/modern/email_modern_grey.html">Modern Grey
                           Color</a></li>
                       <li><a target="_blank" href="Email-Templates/modern/email_modern_orange.html">Modern Orange
                           Color</a></li>
                       <li><a target="_blank" href="Email-Templates/modern/email_modern_purple.html">Modern Purple
                           Color</a></li>
                       <li><a target="_blank" href="Email-Templates/modern/email_modern_red.html">Modern Red Color</a>
                       </li>
                   </ul>
               </li>
           </ul>
       </li>*/
        );
    }
}
export default (Header)