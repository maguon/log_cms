'use strict'
const React = require('react')

class Footer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        return (
            <div className="page-footer">
                <div className="footer-copyright">
                    <div className="container">
                        <span><a className="grey-text text-lighten-4" href="http://themeforest.net/user/pixinvent/portfolio?ref=pixinvent" target="_blank">PIXINVENT</a> All rights reserved.</span>
                        <span className="right hide-on-small-only"> Design and Developed by <a className="grey-text text-lighten-4" href="https://pixinvent.com/">PIXINVENT</a></span>
                    </div>
                </div>
            </div>
        );
    }
}
export default (Footer)
