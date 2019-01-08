import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Modal from './modal';
import ItemMdlCnt from './ItemDetailsHeader';

const styles = {
    card: {
        maxWidth: 400,
        width: 300,
        marginTop: 40
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
};

class SimpleMediaCard extends React.Component {
    constructor(props) {
        super(props);

        this.deleteClick = this.deleteClick.bind(this);
    }

    deleteClick() {
        console.log(this.props.item.sku);
        fetch('/external/deleteEbayItem', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                uid: localStorage.getItem('uid'),
                et: localStorage.getItem('et'),
                sku: this.props.item.sku
            })
        }).then(response => { return response.json(); }).then(res => {
            console.log(res);
        })
    }

    render() {

        return (
            <Card className={this.props.classes.card}>
                <CardMedia
                    className={this.props.classes.media}
                    image={this.props.item.image_url}
                    title="Contemplative Reptile"
                />
                <CardContent>
                    <Typography gutterBottom variant="headline" component="h2">
                        {this.props.item.brand}
                    </Typography>
                    <Typography component="p">
                        {this.props.item.model}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Modal modal={this.props.item.sku + "listings"} btnTxt={"Details"}><ItemMdlCnt item={this.props.item}/></Modal>
                    <button onClick={this.deleteClick}>Delete</button>
                </CardActions>
            </Card>
        );
    }
}

SimpleMediaCard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleMediaCard);