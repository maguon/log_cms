'use strict'
const React = require('react');

class Footer extends React.Component {
    constructor(props) {
        super(props);

    }
    render() {
        return (
            <div className="page-footer">
                <div className="footer ">{this.props.pageFooter}</div>
            </div>
        );
    }
}

export default (Footer)

