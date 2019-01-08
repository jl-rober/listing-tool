import React from 'react';
import Closing from './closing-body.jsx';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';


const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    },
    input: {
        display: 'none',
    },
});


class Body extends React.Component {
    render() {
        const { classes } = this.props;

        return (
            <body>
                <div className="jumbotron text-center">
                    <h1><span className="fa fa-lock"></span> Node Authentication</h1>

                    <p>Login or Register with:</p>

                    <Link to="/login">
                        <Button color="primary" className={classes.button}>
                            Login
                        </Button>
                    </Link>
                    <Link to="/signup">
                        <Button color="secondary" className={classes.button}>
                            Sign up
                        </Button>
                    </Link>
                </div>
                <Closing/>
            </body>
        )
    }
}

export default withStyles(styles)(Body);