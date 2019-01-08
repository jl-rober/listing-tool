const React = require('react');
import Header from './components/header.jsx';
import Head from './components/head.jsx';
import Closing from './components/closing-body';
import ItemCard from './components/itemcard';
import SideNav from './components/sidenav';

class listings extends React.Component {

    render() {
        let items;

        let brands;

        if(this.props.items.length > 0) {
            items = this.props.items.map(function(item,i) {
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
                <SideNav brands={this.props.brands}/>
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

module.exports = listings;