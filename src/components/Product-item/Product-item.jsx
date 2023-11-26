import React from 'react';
import './Product-item.css'
import plusCartImg from "../../assets/images/cart-plus.svg";
const Product = (props) => {
    console.log(props.product.name)
    const { img, name, seller, ratings, quantity, price } = props.product
    return (
        <div className='product'>
            <img src={img} alt="" />

            <div className="product-info">
                <h6 className='product-name'>{name}</h6>
                <p>Price: ${price}</p>
                <p className='manufacturer'><small>Manufacturer: {seller}</small></p>
                <p><small>Rating: {ratings} stars</small></p>
            </div>
            <div className="cart-footer">
            <button className='btn-cart'>Add to Cart <img src={plusCartImg} alt="" /></button>

            </div>
        </div>
    );
};

export default Product;