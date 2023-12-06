import React from 'react';
import './ReviewItem.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart, faTrashAlt } from '@fortawesome/free-solid-svg-icons'


const ReviewItem = ({product, handleRemoveFromCart}) => {
    console.log(product)
    const {img, id, name, price, quantity, shipping } = product
    return (
        <div className='review-item'>
            <img src={img} alt="" />
            <div className='review-details'>
                <p className='product-title'>{name}</p>
                <p>Price: <span>${price}</span></p>
                <p>Order Quantity: <span>{quantity}</span></p>
            </div>
            <button onClick={ () => handleRemoveFromCart(id)} className='btn-delete'>
            <FontAwesomeIcon className='delete-icon' icon={faTrashAlt} />
            </button>
        </div>
    );
};

export default ReviewItem;