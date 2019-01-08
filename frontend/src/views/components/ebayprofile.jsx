import React from 'react';
import EbayPolicies from './ebaypolicies';

class ebayprofile extends React.Component {

    render() {
        let fulfillmentPolicies = this.props.policies.fulfillment.map(function(item,i) {
            return <li class="list-group-item">{item.name}</li>
        });
        let paymentPolicies = this.props.policies.payment.map(function(item,i) {
            return <li class="list-group-item">{item.name}</li>
        });
        let returnPolicies = this.props.policies.return.map(function(item,i) {
            return <li class="list-group-item">{item.name}</li>
        });

        return (
            <div className="ebayprofile">
                <ul className="nav nav-tabs" id="myTab" role="tablist">
                    <li className="nav-item">
                        <a className="nav-link active" id="policies-tab" data-toggle="tab" href="#policies" role="tab"
                           aria-controls="policies" aria-selected="true">Policies</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" id="locations-tab" data-toggle="tab" href="#locations" role="tab"
                           aria-controls="locations" aria-selected="false">Locations</a>
                    </li>
                </ul>
                <div className="tab-content" id="myTabContent">
                    <div className="tab-pane fade show active" id="policies" role="tabpanel"
                         aria-labelledby="policies-tab"><EbayPolicies policies={this.props.policies}/>
                    </div>
                    <div className="tab-pane fade" id="locations" role="tabpanel" aria-labelledby="locations-tab">...
                    </div>
                </div>
            </div>

        );
    };
}

export default ebayprofile;