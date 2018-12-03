'use strict'
const React = require('react')

class Footer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        return (
            <div className="page-footer">
                <div className="foot">
                    <div className="footerLi row col s12">
                        <div className="span3 col">
                            <div className="lined">
                                <h2><span>公司简介</span></h2>
                                <h5>Company profile</h5>
                                <span className="bolded-line"></span>
                            </div>
                            {
                                this.props.profileList.map((profileItem,index) => <p key={index} dangerouslySetInnerHTML={{ __html: profileItem.news_content }} />)
                            }
                        </div>
                        <div className="span3 col">
                            <div className="lined">
                                <h2><span>人才招聘</span></h2>
                                <h5>personnel recruitment</h5>
                                <span className="bolded-line"></span>
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
                                <input className="search-width col s9" id="appendedInputButton"  name="searchNews.newsName" type="text"/>
                                 <button className="btn btn-theme col s3" type="submit">Go</button>
                                <a href={"/view/search/仓储场地"}>Go11111111111111</a>
                            </div>
                        </div>
                        <div className="span3 col">
                            <div className="lined">
                                <h2><span>联系我们</span></h2>
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
