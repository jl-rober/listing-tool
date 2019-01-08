import React from 'react';
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core/styles/index";
import AppBar from '@material-ui/core/AppBar';
import classNames from 'classnames';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

const styles = theme => ({
    root: {
        flexGrow: 1,
        height: 430,
        zIndex: 1,
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
    drawerPaper: {
        position: 'relative',
        width: drawerWidth,
    },
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing.unit * 3,
        minWidth: 0, // So the Typography noWrap works
    },
    toolbar: theme.mixins.toolbar,
    navLink: {
        marginRight: 40
    }
});

const drawerWidth = 240;

class Header extends React.Component {
    constructor() {
        super();

        this.state = {};
    }
    render() {
        const { classes } = this.props;
        const { anchor } = this.state;

        return (
            <AppBar
                position="absolute"
                className={classNames(classes.appBar, classes[`appBar-${anchor}`])}
            >
                <Toolbar>
                    <Typography variant="title" color="inherit" noWrap>
                        <a href="/profile" className={classes.navLink}>Profile</a>
                        <a href="/inventory" className={classes.navLink}>Inventory</a>
                    </Typography>
                </Toolbar>
            </AppBar>
        )
    }
}

Header.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Header);