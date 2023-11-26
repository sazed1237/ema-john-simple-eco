import React from 'react';
import './Product-item.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'

const Product = (props) => {
    // console.log(props)
    const { img, name, seller, ratings, quantity, price } = props.product
    const handleAddToCart = props.handleAddToCart



    return (
        <div className='product'>
            <img src={img} alt="" />

            <div className="product-info">
                <h6 className='product-name'>{name}</h6>
                <p>Price: ${price}</p>
                <p className='manufacturer'><small>Manufacturer: {seller}</small></p>
                <p><small>Rating: {ratings} stars</small></p>
            </div>

            <button onClick={() => handleAddToCart(props.product)} className='btn-cart'>
                Add to Cart   
                <FontAwesomeIcon icon={faShoppingCart} />
                </button>

        </div>
    );
};

export default Product;