import React from 'react';
import Header from './components/header.jsx';
import Head from './components/head.jsx';
import Closing from './components/closing-body';
import EbayProfile from './components/ebayprofile';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';
import testpro from './components/testpro';
import queryString from 'query-string'
import ProfileContent from './components/profile-content';
import configIt from '../config/config.js';

class profile extends React.Component {
    constructor() {
        super();
        this.state = {
            date: new Date(),
            policies: "",
            ebaySignedIn: false,
            redirect: false,
            configIt: new configIt()
        };

        this.configIt = new configIt();
        this.logout = this.logout.bind(this);
    }

    componentDidMount() {
        if (this.props.location.search) {
            let queries = queryString.parse(this.props.location.search);

            if (queries.code) {
                fetch('/external/ebay-login-redirect', {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({code: queries.code})
                }).then(response => {
                    return response.json();
                }).then(res => {
                    if(res.status === 'success') {
                        fetch('/external/getPolicies')
                            .then(response => {
                                console.log(response.body);
                                return response.json();
                            }).then(res => {
                                console.log(res);
                                this.setState({policies: JSON.parse(res)});
                        })
                    }
                })
            }
        }

        /*
        if(this.state.ebaySignedIn) {
            fetch('/external/getPolicies')
            .then(response => {
                console.log(response.body);
                return response.json();
            }).then(res => {
                console.log(res);
                this.setState({policies: JSON.parse(res)});
            })
        }
        */
    }

    logout() {
        fetch('/user/logout').then(res => { return res.json(); }).then(res => { console.log(res); this.setState({redirect: true})});
    }

    render() {
        if(this.state.redirect) {
            return <Redirect to="/" />
        }

        return (
            <html>
            <Head/>
            <Header/>
            <body>
                <div className="container">

                    <div className="page-header text-center">
                        <h1><span className="fa fa-anchor"></span> Profile Page</h1>
                        <button onClick={this.logout}>Logout</button>
                    </div>

                    <div className="row">

                        <div className="col-sm-6">
                            <div className="well">
                                <h3><span className="fa fa-user"></span> Local</h3>

                                <p>
                                    <strong><a href={this.configIt.ebayVars.ebaySignInUrl}>Login to eBay</a></strong>
                                </p>
                            </div>
                        </div>

                    </div>

                    <ProfileContent policies={this.state.policies} />

                </div>
                <Closing />
            </body>
            </html>
        );
    };
}

export default profile;