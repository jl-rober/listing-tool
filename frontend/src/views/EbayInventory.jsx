import React from 'react';
import Header from './components/header.jsx';
import Head from './components/head.jsx';
import Closing from './components/closing-body';
import ItemCard from './components/itemcard';
import SideNav from './components/sidenav';
import Drawer from './components/drawer.jsx';

class inventory extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            items: {},
            brands: []
        }
    }

    componentDidMount() {
        if(localStorage.getItem('et')) {
            fetch('/inventory/getitems', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    uid: localStorage.getItem('uid'),
                    ebayToken: localStorage.getItem('et')
                })
            }).
            then(response => {
                return response.json()
            }).then(res => {
                console.log(res);
                this.setState({items: res.items, brands: res.brands})
            });
        }
    }

    render() {
        let items;

        let brands;



        if(this.state.items.length > 0) {
            items = this.state.items.map(function(item,i) {
                return <ItemCard item={item}/>
            });
        } else {
            items = <h1>No items to display</h1>
        }


        return (
            <html>
            <Head/>
            <Header/>
            <body>
            <div className="item-page-container">
                <Drawer />
                <div className="items container">
                    {items}
                </div>
            </div>
            <Closing />
            </body>
            </html>

        );
    };
}

export default inventory;