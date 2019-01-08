import React from 'react';
import Head from './components/head.jsx';
import Closing from './components/closing-body';
import ItemCard from './components/itemcard';
import SideNav from './components/sidenav';
import Drawer from './components/drawer.jsx';
import AppBar from '@material-ui/core/AppBar';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import Header from './components/header.jsx';
import ItemList from './components/ItemList';
import { BrowserRouter as PropsRoute, Router, Route, Link } from 'react-router-dom';
import queryString from "query-string";


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
});

const drawerWidth = 240;


class inventory extends React.Component {
    constructor() {
        super();

        this.state = {
            items: {},
            ebayItems: {},
            brands: []
        }
    }

    render() {
        return (
            <html>
                <Head/>
                <body>
                    <div className="item-page-container">
                        <Header />
                        <Drawer />
                        <ItemList />
                    </div>
                    <Closing />
                </body>
            </html>

        );
    };
}

inventory.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(inventory);