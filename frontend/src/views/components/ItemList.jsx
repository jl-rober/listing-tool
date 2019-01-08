import React from 'react';
import ItemCard from './itemcard';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';


class ItemList extends React.Component {
    constructor() {
        super();

        this.state = {
            items: [],
            type: "local"
        }
    }

    /*
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
    */



    componentDidMount() {
        if(window.location.pathname === "/inventory") {
            this.setState({type: "local"});

            fetch('/inventory/getitems', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }).
            then(response => {
                return response.json()
            }).then(res => {
                console.log(res.items);
                this.setState({items: res.items});
            });
        } else {
            console.log("no uid");
        }

        if(window.location.pathname === "/inventory/ebay") {
            this.setState({type: "ebay"});
            fetch('/external/getEbayItems', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    uid: localStorage.getItem('uid'),
                    et: localStorage.getItem('et')
                })
            }).then(response => { return response.json(); }).then(res => {
                let data = JSON.parse(res);
                console.log(data);
                if(data.total > 0) {
                    var inventory = data.inventoryItems;

                    var items = [];

                    for(var i = 0; i < inventory.length; i++) {
                        items.push({
                            brand: inventory[i].product.brand,
                            model: inventory[i].product.mpn,
                            sku: inventory[i].sku,
                            image_url: inventory[i].product.imageUrls[0],
                            ebay: {
                                title: inventory[i].product.title,
                                description: inventory[i].product.description,
                                quantity: inventory[i].availability.shipToLocationAvailability.quantity,
                                condition: inventory[i].condition
                            }
                        })
                    }

                    this.setState({ items: items });
                }
            })
        }
    }

    render() {
        let items;

        if(this.state.items && this.state.items.length > 0) {
            let that = this;
            items = this.state.items.map(function (item, i) {
                return <ItemCard item={item} type={that.state.type} />
            });
        } else {
            items = <h1>No items to display</h1>
        }




        return (
            <div className="item-page-container">
                <div className="items container">
                    {items}
                </div>
            </div>
        );
    };
}

export default ItemList;