import React from 'react';
import Header from '../components/header.jsx';
import Head from '../components/head.jsx';
import Closing from '../components/closing-body';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { instanceOf } from 'prop-types';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Cookies from 'universal-cookie';
import Button from '@material-ui/core/Button';
import Snackbar from '../components/Snackbar';
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

class Login extends React.Component {
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            redirect: false,
            showError: 0
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    handleSubmit(event) {
        event.preventDefault();

        fetch('/user/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password,
            })
        }).then(res => {
                if(res.status !== 200) {
                    const errorNum = this.state.showError + 1;
                    this.setState({ showError: errorNum});
                } else {
                    return res.json();
                }
            })
            .then( res => {
                if(res) {
                    this.props.history.push('/profile');
                }
            });
    }

    render() {
        const { classes } = this.props;
        return (
            <html>
                <Head />
                <body>
                    <div className="container">

                        <div className="col-sm-6 col-sm-offset-3">

                            <h1><span class="fa fa-sign-in"></span> Login</h1>

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
                                    Login
                                </Button>
                            </form>

                            <hr/>

                            <p>Need an account? <Link to="/signup"><a href="/signup">Signup</a></Link></p>
                            <p>Or go <Link to="/"><a href="/">home</a></Link>.</p>

                            <Snackbar showError={this.state.showError} />

                        </div>

                    </div>
                    <Closing />
                </body>
            </html>
        );
    };
}

Login.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Login);