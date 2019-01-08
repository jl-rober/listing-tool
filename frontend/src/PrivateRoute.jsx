import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

class PrivateRoute extends React.Component {
    constructor() {
        super();
        this.state = {
            output: ""
        }
    }

    componentDidUpdate(prevProps) {
        console.log(prevProps);
        
        fetch('/isLoggedIn').then(
            res => {
                return res.json()
            }).then(
            res => {
                console.log(res);

                if(res.loggedIn === 'true') {
                    //this.state.output = <Route {...this.props}
                    let output = <Route {...this.props} />
                    if(this.state.output !== output) {
                        console.log('yup');
                        this.setState({output: output})
                    }
                } else {
                    if(this.props.path === '/login') {
                        //this.setState({output: <Redirect to="/login"/>})
                    } else {
                        //this.setState({output: <Redirect to="/login"/>})
                    }
                }
            });
    }

    render() {

        /*
        if(cookies.get('isLoggedIn') === 'true') {
            output = <Route {...this.props} />
        } else {
            if(this.props.path === '/login') {
                output = "";
            } else {
                output = <Redirect to="/login" />
            }
        }
        */

        return(
            <div>{this.state.output}</div>
        )
    }

}

export default PrivateRoute;