import React from 'react';
import Header from '../components/header.jsx';
import Head from '../components/head.jsx';
import Closing from '../components/closing-body';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';
import Cookies from 'universal-cookie';
import Button from '@material-ui/core/Button';
const cookies = new Cookies();

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
    menu: {
        width: 200,
    },
    button: {
        margin: theme.spacing.unit,
    },
    input: {
        display: 'none',
    },
});

class Signup extends React.Component {
    constructor() {
        super();
        this.state = {
            email: "",
            password: "",
            redirect: false
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();

        fetch('/user/signup', {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password
            })
        }).then(res => { console.log(res); if(res.status === 200) { return res.json(); } else { return false; }})
            .then(res => { if(res !== false)
            {
                console.log(res);
                cookies.set('isLoggedIn', 'true');
                this.setState({ redirect: true }) }
            });
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };
    render() {
        const { classes } = this.props;

        if(this.state.redirect) {
            return <Redirect to="/profile" />
        }

        return (
                    <html>
                        <Head />
                        <body>
                            <div className="container">

                                <div className="col-sm-6 col-sm-offset-3">

                                    <h1><span className="fa fa-sign-in"></span> Signup</h1>

                                    {this.props.message && this.props.message.length > 0 &&
                                        <div className="alert alert-danger">{this.props.message}</div>
                                    }

                                    <form method="post" onSubmit={this.handleSubmit}>
                                        <div className="form-group">
                                            <TextField
                                                id="email"
                                                label="Email"
                                                className={classes.textField}
                                                value={this.state.email}
                                                onChange={this.handleChange('email')}
                                                margin="normal"
                                                name="email"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <TextField
                                                id="password"
                                                label="Password"
                                                className={classes.textField}
                                                value={this.state.password}
                                                onChange={this.handleChange('password')}
                                                type="password"
                                                autoComplete="current-password"
                                                margin="normal"
                                                name="password"
                                            />
                                        </div>

                                        <Button color="primary" className={classes.button} type="submit">
                                            Signup
                                        </Button>
                                    </form>

                                    <hr/>

                                    <p>Already have an account? <Link to="/login"><a href="/login">Login</a></Link></p>
                                    <p>Or go <Link to="/"><a href="/">home</a></Link>.</p>

                                </div>

                            </div>
                            <Closing />
                        </body>
                    </html>
        );
    };
};

Signup.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Signup);