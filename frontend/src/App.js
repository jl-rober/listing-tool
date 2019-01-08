import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Link, Redirect, Switch } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import Login from './views/user/login.jsx';
import Signup from './views/user/signup.jsx';
import Profile from './views/profile.jsx';
import Index from './views/index.jsx';
import Inventory from './views/inventory.jsx';
import PrivateRoute from './PrivateRoute';
import Cookies from 'universal-cookie';
const cookies = new Cookies();


class App extends Component {
    constructor(props) {
        super(props);
        //this.state = { loggedIn: false };
    }

    render() {
        /*
        if(cookies.get('isLoggedIn') === 'true') {
            this.state.loggedIn = true;
        }
        */

        return(
            <Router>
                <div className="App">
                    <div>
                        <Route exact path="/" component={Index} />
                        <Route exact path="/login" component={Login}/>
                        <Route exact path="/signup" component={Signup} />
                        <PrivateRoute path="/inventory" component={Inventory}/>
                        <PrivateRoute path="/profile" component={Profile}/>
                    </div>
                </div>
            </Router>
        );
    }
}

export default App;
