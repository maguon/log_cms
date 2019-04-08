


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
                            <a href={"/view/st"} className="col s12">
                                <img alt="logo" className='shuntong' src="/backend/assets/images/logo.png"  id="logo_img"/>

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
                            <a href={"/view/hongli"} className="col s12">
                                <img alt="logo" className='hongli logo_img' src="/backend/assets/images/honglilogo.png" />
                            </a>

                        </div>

                        <div className="nav_ce col s7">
                            <ul className="tree_1 col s7 offset-s5">
                                {
                                    this.props.menuList.map((menuItem,index) => <li className='nav_block col'><a className="collection-item white-text"  href={"#menu"+index}>{menuItem.menu_name}</a></li>)
                                }
                            </ul>
                        </div>

                    </div>
                </div>

                <div className="row mingyuan">
                    <div className="col s12 m4 l3" id="nav_bg">
                        <div className="logoimg col s4 offset-s1">
                            <a href={"/view/mingyuan"} className="col s2">
                                <img alt="logo" className='logo_img' src="/backend/assets/images/mingyuanlogo.png" />
                            </a>
                            <p className='col s10 nameLogo left-align'>洺源科技</p>
                        </div>

                        <div className="nav_ce col s6">
                            <ul className="tree_1 col s12">
                                {
                                    this.props.menuList.map((menuItem,index) =>{
                                        return index === 4 ?
                                        <li className='nav_block col'>
                                            <a className="collection-item black-text"  key='0' href={"/view/menu/"+menuItem._id.toString()+"/menuType/"+menuItem.menu_type+"/page/1/news"}>{menuItem.menu_name}</a>
                                        </li>:
                                            <li className='nav_block col'><a className="collection-item black-text"  href={"/view/mingyuan#menu"+index}>{menuItem.menu_name}</a></li>

                                    })
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