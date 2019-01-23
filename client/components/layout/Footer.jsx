'use strict'
const React = require('react');

class Footer extends React.Component {
    constructor(props) {
        super(props);

    }
    render() {
        let recruitLink;
        let contactLink;
        if(this.props.recruitList.length===0){
            recruitLink = "";
        }else{
            recruitLink = "/view/menu/"+this.props.recruitList[0].menu_id._id+"/menuType/"+this.props.recruitList[0].menu_id.menu_type+"/page/1/news";
        };
        if(this.props.recruitList.length===0){
            contactLink = "";
        }else{
            contactLink = "/view/menu/"+this.props.contactList[0].menu_id._id+"/menuType/"+this.props.contactList[0].menu_id.menu_type+"/page/1/news";
        };
        return (
            <div className="page-footer">
                <div className="foot" style={{height:263+'px'}}>
                    <div className="footerLi row col s12 shuntong">
                        <div className="span3 col">
                            <div className="lined">
                                <h2><span><a href={"/view/menu/5bfbb5e606e91f3814c8d0e4/menuType/1/page/1/news"}>公司简介</a></span></h2>
                                <h5>Company profile</h5>
                                <span className="bolded-line"></span>
                            </div>
                            <p>大连顺通圣世物流有限公司成立于2013年1月14日，位于大连市保税区瑞港路，临近疏港高速，主营商品汽车运输、普通货物运输、集装箱运输、零部件运输、仓储等，并在沈阳、长春、天津、上海、广州、成都设有办事处。</p>
                        </div>
                        <div className="span3 col">
                            <div className="lined">
                                <h2><span><a href={recruitLink}>人才招聘</a></span></h2>
                                <h5>personnel recruitment</h5>
                                <span className="bolded-line"> </span>
                            </div>
                            <div>
                                {
                                    this.props.recruitList.map((recruitItem,index) => <p key={index} dangerouslySetInnerHTML={{ __html: recruitItem.news_title }} />)
                                }
                            </div>
                        </div>
                        <div className="span3 col">
                            <div className="lined">
                                <h2>站内查询</h2>
                                <h5>Find</h5>
                                <span className="bolded-line"></span>
                            </div>
                            <div className="input-append row  col s12">
                                <form action='/view/search'>
                                    <input className="search-width col s9"  name="search" type="text"   />
                                    <input className="btn btn-theme col s3" type="submit" value='Go'/>
                                </form>

                            </div>
                        </div>
                        <div className="span3 col">
                            <div className="lined">
                                <h2><span><a href={contactLink}>联系我们</a></span></h2>
                                <h5>CONTACT US</h5>
                                <span className="bolded-line"> </span>
                            </div>
                            <div className="f_end">
                                {
                                    this.props.contactList.map((contactItem,index) => <p key={index} dangerouslySetInnerHTML={{ __html: contactItem.news_content }} />)
                                }
                            </div>
                        </div>
                    </div>
                    <div className="footerLi row col s12 hongli" id='menu2'>
                        <div  id='showLinkMe'>
                            <div id="hdjy">
                                <div className="kect_index">
                                    <h4>联系我们</h4>
                                </div>
                                <div className="f_end">
                                    {
                                        this.props.contactList.map((contactItem,index) => <p key={index} dangerouslySetInnerHTML={{ __html: contactItem.news_content }} />)
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="footer shuntong">大连顺通圣世物流有限公司&nbsp;备案号:辽ICP备14011916号</div>
                <div className="footer hongli">大连洪溧物流有限公司&nbsp;备案号:辽ICP备14011916号</div>
            </div>
        );
    }
}

export default (Footer)

