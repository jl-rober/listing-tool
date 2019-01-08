const React = require('react');


class Modal extends React.Component {
    render() {
        return (
            <div class="modal-wrapper">
                <div className="modal" tabIndex="-1" role="dialog" id={this.props.modal + "Modal"}>
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Modal title</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                {this.props.children}
                            </div>
                        </div>
                    </div>
                </div>
                <a data-toggle="modal" data-target={"#" + this.props.modal + "Modal"}>{this.props.btnTxt}</a>
            </div>
        )
    }
}

module.exports = Modal;