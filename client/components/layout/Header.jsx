'use strict'
const React = require('react')

class Header extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        return (
            <div className="nav-wrapper">
                <div className="row">
                    <div className="col s12 m10 offset-m1">
                        <h1 className="header">Header</h1>
                    </div>
                </div>
            </div>
        );
    }
}
export default (Header)
