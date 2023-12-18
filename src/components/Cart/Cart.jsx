import React from 'react';
import './Cart.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt, faLongArrowAltRight, faSquareCheck } from '@fortawesome/free-solid-svg-icons'


const Cart = ({ cart, handleClearCart, children }) => {

    // const cart = props.cart  //option no. 1
    // const {cart} = props     // option no. 2

    console.log(cart)

    // calculate total
    let totalPrice = 0;
    let totalShipping = 0;
    let quantity = 0;
    for (const product of cart) {
        totalPrice = totalPrice + product.price * product.quantity;
        totalShipping = totalShipping + product.shipping
        quantity = quantity + product.quantity
    }

    const tax = totalPrice * 7 / 100;

    const grandTotal = totalPrice + totalShipping + tax;

    return (
        <div className='cart'>
            <h4>Order Summary</h4>
            <p>Selected Items: {quantity}</p>
            <p>Total Price: ${totalPrice} </p>
            <p>Total Shipping Charge: ${totalShipping}</p>
            <p>Tax: ${tax.toFixed(2)}</p>
            <h6>Grand Total: ${grandTotal.toFixed(2)}</h6>
            <button onClick={handleClearCart} className='btn-clear-cart'>
                <span>Clear Cart</span>
                <FontAwesomeIcon className='btn-clear-delete-icon' icon={faTrashAlt} />
            </button>
            {children}
            {/* <button className='btn-review-order'>
                <span>Review Order</span>
                <FontAwesomeIcon className='btn-clear-delete-icon' icon={faLongArrowAltRight} />
            </button> */}
        </div>
    );
};

export default Cart;