'use strict'
const React = require('react')

class Footer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="page-footer">
                <div className="foot" style={{height:275+'px'}}>
                    <div className="footerLi row col s12">
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
                                <h2><span><a href={"/view/menu/"+this.props.recruitList[0].menu_id._id+"/menuType/"+this.props.recruitList[0].menu_id.menu_type+"/page/1/news"}>人才招聘</a></span></h2>
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
                                <input type="hidden" name="p" id="searchpage" value="1" />
                                <input className="search-width col s9" id="appendedInputButton"  name="searchNews.newsName" type="text" value="inputValue"/>
                                 <a  href={"/view/search/"} className="btn btn-theme col s3" type="submit">Go</a>
                            </div>
                        </div>
                        <div className="span3 col">
                            <div className="lined">
                                <h2><span><a href={"/view/menu/"+this.props.contactList[0].menu_id._id+"/menuType/"+this.props.contactList[0].menu_id.menu_type+"/page/1/news"}>联系我们</a></span></h2>
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
                 </div>


                <div className="footer">大连顺通圣世物流有限公司&nbsp;备案号:辽ICP备14011916号</div>
            </div>
            );
        }
     }
    export default (Footer)
