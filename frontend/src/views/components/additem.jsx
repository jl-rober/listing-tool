const React = require('react');

class additem extends React.Component {
    constructor() {
        super();

        this.state = {
            brand: "",
            model: "",
            sku: "",
            image: ""
        };

        this.addItem = this.addItem.bind(this);
        this.handleBrandChange = this.handleBrandChange.bind(this);
        this.handleModelChange = this.handleModelChange.bind(this);
        this.handleSkuChange = this.handleSkuChange.bind(this);
        this.handleImageChange = this.handleImageChange.bind(this);
    }

    handleBrandChange(event) {
        this.setState({ brand: event.target.value});
    }

    handleModelChange(event) {
        this.setState({ model: event.target.value });
    }

    handleSkuChange(event) {
        this.setState({ sku: event.target.value });
    }

    handleImageChange(event) {
        this.setState({ image: event.target.value });
    }

    addItem(e) {
        e.preventDefault();

        fetch('/inventory/updateitem', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                uid: localStorage.getItem('uid'),
                brand: this.state.brand,
                model: this.state.model,
                sku: this.state.sku,
                image: this.state.image
            })
        }).
        then(response => {
            return response.json()
        }).then(res => {
            console.log(res);
        });
    }

    render() {
        return (
            <div className="additem">

                <form action="inventory/additem" method="post" encType="multipart/form-data" onSubmit={this.addItem}>
                    <div className="form-group">
                        <label>Brand</label>
                        <input type="text" className="form-control" name="brand" onChange={this.handleBrandChange}/>
                    </div>
                    <div className="form-group">
                        <label>Model</label>
                        <input type="text" className="form-control" name="model" onChange={this.handleModelChange}/>
                    </div>
                    <div className="form-group">
                        <label>Sku</label>
                        <input type="text" className="form-control" name="sku" onChange={this.handleSkuChange}/>
                    </div>
                    <div className="custom-file">
                        <input type="text" className="form-control" name={"image"} onChange={this.handleImageChange}/>
                    </div>

                    <button type="submit" className="btn btn-warning btn-lg">Add Item</button>
                </form>

            </div>

        );
    };
}

module.exports = additem;