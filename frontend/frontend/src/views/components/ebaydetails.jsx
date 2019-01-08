import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
const React = require('react');

class ebaydetails extends React.Component {
    constructor(props) {
        super(props);
        let title, description, condition, quantity, model, brand, sku, image_url, _id;
        title = description = condition = quantity = model = brand = sku = image_url = _id = "";
        if(this.props.item) {
            const item = this.props.item;
            model = item.model;
            brand = item.brand;
            sku = item.sku;
            image_url = item.image_url;
            _id = item._id;

            if(item.ebay) {
                const ebay = item.ebay;
                title = ebay.title;
                description = ebay.description;
                condition = ebay.condition;
                quantity = ebay.quantity;
            }
        }

        this.state = {
            title: title,
            title2: "",
            description: description,
            condition: condition,
            quantity: quantity,
            model: model,
            brand: brand,
            sku: sku,
            image_url: image_url,
            _id: _id
        };

        this.handleChange = this.handleChange.bind(this, 'blah');
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleList = this.handleList.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();

        fetch('/inventory/updateitem', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: this.state.title,
                description: this.state.description,
                brand: this.state.brand,
                model: this.state.model,
                sku: this.state.sku,
                quantity: this.state.quantity,
                condition: this.state.condition,
                image_url: this.state.image_url,
                _id: this.state._id
            })
        }).
        then(response => {
            return response.json()
        }).then(res => {
            console.log(res);
        });
    }

    handleChange(name, event) {
        console.log(event);
        if(event !== undefined) {
            this.setState({[event.target.name]: event.target.value});
        }
        console.log(this.state.condition);
    }

    handleList() {
        console.log(this.state.condition.toUpperCase());
        fetch('/external/addEbayItem', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                _id: this.state._id,
                item: {
                    availability:
                        {
                            shipToLocationAvailability: { quantity: parseInt(this.state.quantity) }
                        },
                    condition: this.state.condition.toUpperCase(),
                    product: {
                        brand: this.state.brand,
                        description: this.state.description,
                        imageUrls: [this.state.image_url],
                        mpn: this.state.mpn,
                        title: this.state.title
                    },
                    sku: this.state.sku
                }
            })
        }).
        then(response => {
            return response.json()
        }).then(res => {
            console.log(res);
        });
    }

    render() {

        const { classes } = this.props;

        return (
            <div className="listings">
                <form action="inventory/updateitem" method="post" onSubmit={this.handleSubmit}>
                    <div className={"form-group"}>
                        <label>Condition</label>
                        <select className="custom-select" name={"condition"} defaultValue={this.state.condition} onChange={this.handleChange}>
                            <option selected>Choose Condition...</option>
                            <option value="NEW">New</option>
                            <option value="USED">Used</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Title</label>
                        <input type="text" className="form-control" name="title" defaultValue={this.state.title} onChange={this.handleChange} />
                    </div>
                    <div className="form-group">
                        <label>Description</label>
                        <input type="textarea" className="form-control" name="description" defaultValue={this.state.description} onChange={this.handleChange}/>
                    </div>
                    <div className="form-group">
                        <label>Brand</label>
                        <input type="text" className="form-control" name="brand" defaultValue={this.state.brand} onChange={this.handleChange}/>
                    </div>
                    <div className="form-group">
                        <label>Model</label>
                        <input type="text" className="form-control" name="model" defaultValue={this.state.model} onChange={this.handleChange}/>
                    </div>
                    <div className="form-group">
                        <label>Sku</label>
                        <input type="text" className="form-control" name="sku" defaultValue={this.state.sku} onChange={this.handleChange}/>
                    </div>
                    <div className="form-group">
                        <label>Quantity</label>
                        <input type="text" className="form-control" name="quantity" defaultValue={this.state.quantity} onChange={this.handleChange}/>
                    </div>
                    <div className="form-group">
                        <label>Image URL</label>
                        <input type="text" className="form-control" name="image_url" defaultValue={this.state.image_url} onChange={this.handleChange}/>
                    </div>
                    <input type="text" name="item_id" value={this.state._id} style={{display: 'none'}}/>

                    <button type="button" className="btn btn-warning btn-lg" onClick={this.handleList}>List to eBay</button>
                    <button type="submit" className="btn btn-success btn-lg">Save Item</button>
                </form>
            </div>

        );
    };
}

export default ebaydetails;