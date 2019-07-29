import React from 'react';
import './cart-item.styles.scss';
import IItemData from '../../models/interfaces/IItemData';

type cartItemType = {
    item: IItemData
} & {
    quantity: number
}

const CartItem: React.FC<cartItemType> = ({item: {imageUrl, name, price}, quantity}) => {
    return (
        <div className="cart-item">
            <img src={imageUrl} alt={name} />
            <div className="item-details">
                <span className="name">{name}</span>
                <span className="price">{quantity} x ${price}</span>
            </div>
        </div>
    )
}

export default React.memo(CartItem);