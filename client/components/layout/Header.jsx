'use strict'
const React = require('react')

class Header extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        var style1,style2;
        console.log(this.props.multiMenu)
        if(this.props.multiMenu==0){
            style1='block';
            style2='none'
        }else {
            style2='block';
            style1='none'
        }

        let Item=[];
        let list=this.props.menuList[0].menu_tree;
        for(let i=0;i<this.props.menuList[0].menu_tree.length;i++){
            if(this.props.menuList[0].menu_tree[i].menu_link!=""&&this.props.menuList[0].menu_tree[i].menu_link!=null){
                Item.push(<li className="page-scroll" key={i} ><a  href={this.props.menuList[0].menu_tree[i].menu_link}>{this.props.menuList[0].menu_tree[i].menu_name}</a></li>
                )
            }else {
                Item.push(<li className="page-scroll" key={i} ><a  href={"/view/menu/" + this.props.menuList[0].menu_tree[i]._id.toString() + "/menuType/" + this.props.menuList[0].menu_tree[i].menu_type + "/page/1/news"}>{this.props.menuList[0].menu_tree[i].menu_name}</a></li>
                )
            }
        }
        return (
            <nav className="one-page-header one-page-header-style-2 navbar navbar-default  navbar-fixed-top" data-target=".one-page-header" role="navigation">
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
                            <ul  className="nav navbar-nav floatRight" style={{display:style1}}>
                                <li className="page-scroll"  ><a  href={"/"}>首页</a></li>
                                    {Item}
                            </ul>
                            <ul className="nav navbar-nav floatRight" style={{display:style2}}>
                                <li className="page-scroll" ><a  href={"/"}>首页</a></li>
                                {
                                 list.map((item, index) =>(
                                     item.children==''?  <li className="page-scroll" key={index}>
                                         {item.menu_link == ""||item.menu_link==null ?
                                              <a  href={"/view/menu/" + item._id.toString() + "/menuType/" +item.menu_type + "/page/1/news"}>{item.menu_name}</a>
                                            : <a href={item.menu_link}>{item.menu_name}</a>
                                         }
                                     </li>:
                                         <li className="dropdown" key={index}>
                                             {item.menu_link == ""||item.menu_link==null ?
                                                 <a  href={"/view/menu/" + item._id.toString() + "/menuType/" +item.menu_type + "/page/1/news"}>{item.menu_name}</a>
                                                 : <a href={item.menu_link}>{item.menu_name}</a>
                                             }

                                             <ul className="dropdown-menu">
                                             {item.children.map((itemcChildren, i) =>(
                                                 <li key={i}>
                                                 {itemcChildren.menu_link == ""||itemcChildren.menu_link==null ?
                                                         <a  href={"/view/menu/" + itemcChildren._id.toString() + "/menuType/" +itemcChildren.menu_type + "/page/1/news"}>{itemcChildren.menu_name}</a>
                                                         : <a href={itemcChildren.menu_link}>{itemcChildren.menu_name}</a>
                                                 }
                                                 </li>
                                             ))}
                                             </ul>
                                         </li>
                                 ))}
                            </ul>
                        </div>
                    </div>

                </div>
            </nav>

        );
    }
}
export default (Header)