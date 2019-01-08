import React from 'react';
import Modal from './modal';
import ItemMdlCnt from './ItemDetailsHeader';

class ItemCard extends React.Component {

    render() {
        console.log(this.props.item);
        let removeText = "/remove?model=" + this.props.item.model;

        return (
            <div className="card item-card">
                <img className="card-img-top" src={this.props.item.image_url} alt="Card image cap"/>
                <div className="card-body">
                    <h5 className="card-title">{this.props.item.brand}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">{this.props.item.model}</h6>
                    <p className="card-text">{this.props.item.sku}</p>
                    <a href={removeText} className="card-link">Remove</a>
                    <Modal modal={this.props.item.sku + "listings"} btnTxt={"Details"}><ItemMdlCnt item={this.props.item}/></Modal>
                </div>
            </div>
        )
    }
}

export default ItemCard;