const React = require('react');

class ebaypolicies extends React.Component {

    render() {

        let fulfillmentPolicies = this.props.policies.fulfillment.map(function(item,i) {
            return <div className="card">
                        <div className="card-header" id={"heading" + i}>
                            <h5 className="mb-0">
                                <button className="btn btn-link" type="button" data-toggle="collapse" data-target={"#collapse" + i}
                                        aria-expanded="true" aria-controls={"collapse" + i}>
                                    {item.name}
                                </button>
                            </h5>
                        </div>

                        <div id={"collapse" + i} className="collapse" aria-labelledby={"heading" + i} data-parent="#accordion">
                            <div className="card-body">
                                {item.description}
                            </div>
                        </div>
                    </div>
        });
        let paymentPolicies = this.props.policies.payment.map(function(item,i) {
            return <li class="list-group-item">{item.name}</li>
        });
        let returnPolicies = this.props.policies.return.map(function(item,i) {
            return <li class="list-group-item">{item.name}</li>
        });

        return (
            <div className="ebaypolicies">
                <ul className="nav nav-tabs" id="myTab" role="tablist">
                    <li className="nav-item">
                        <a className="nav-link active" id="home-tab" data-toggle="tab" href="#shippingpolicy" role="tab"
                           aria-controls="shippingpolicy" aria-selected="true">Shipping</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" id="profile-tab" data-toggle="tab" href="#paymentpolicy" role="tab"
                           aria-controls="paymentpolicy" aria-selected="false">Payment</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" id="contact-tab" data-toggle="tab" href="#returnpolicy" role="tab"
                           aria-controls="returnpolicy" aria-selected="false">Return</a>
                    </li>
                </ul>
                <div className="tab-content" id="myTabContent">
                    <div className="tab-pane fade show active" id="shippingpolicy" role="tabpanel"
                         aria-labelledby="shippingpolicy-tab">
                        <div className="accordion" id="accordion">
                            {fulfillmentPolicies}
                        </div>
                    </div>
                    <div className="tab-pane fade" id="paymentpolicy" role="tabpanel" aria-labelledby="paymentpolicy-tab">
                        <ul class="list-group">
                            {paymentPolicies}
                        </ul>
                    </div>
                    <div className="tab-pane fade" id="returnpolicy" role="tabpanel" aria-labelledby="returnpolicy-tab">
                        <ul class="list-group">
                            {returnPolicies}
                        </ul>
                    </div>
                </div>
            </div>

        );
    };
}

<div className="accordion" id="accordion">
    <div className="card">
        <div className="card-header" id="headingOne">
            <h5 className="mb-0">
                <button className="btn btn-link" type="button" data-toggle="collapse" data-target="#collapseOne"
                        aria-expanded="true" aria-controls="collapseOne">
                    Collapsible Group Item #1
                </button>
            </h5>
        </div>

        <div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
            <div className="card-body">
                Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf
                moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod.
                Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda
                shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea
                proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim
                aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
            </div>
        </div>
    </div>
</div>

module.exports = ebaypolicies;