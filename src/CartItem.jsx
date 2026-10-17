
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

function CartItem({ onContinueShopping }) {
    const cartItems = useSelector((state) => state.cart.items);
    const dispatch = useDispatch();

    const calculateTotalCost = (item) => {
        const price = parseFloat(item.cost.substring(1));
        return price * item.quantity;
    };

    const calculateTotalAmount = () => {
        return cartItems.reduce(
            (total, item) => total + calculateTotalCost(item),
            0
        );
    };

    const calculateTotalItems = () => {
        return cartItems.reduce(
            (total, item) => total + item.quantity,
            0
        );
    };

    const handleIncrement = (item) => {
        dispatch(
            updateQuantity({
                name: item.name,
                quantity: item.quantity + 1,
            })
        );
    };

    const handleDecrement = (item) => {
        if (item.quantity > 1) {
            dispatch(
                updateQuantity({
                    name: item.name,
                    quantity: item.quantity - 1,
                })
            );
        } else {
            dispatch(removeItem(item.name));
        }
    };

    const handleRemove = (item) => {
        dispatch(removeItem(item.name));
    };

    const handleContinueShopping = (e) => {
        if (onContinueShopping) {
            onContinueShopping(e);
        }
    };

    const handleCheckoutShopping = () => {
        alert('Coming Soon');
    };

    return (
        <div className="cart-container">
            <h2>Shopping Cart</h2>

            {cartItems.length === 0 ? (
                <div className="empty-cart">
                    <h3>Your cart is empty</h3>
                    <button
                        className="continue-shopping-button"
                        onClick={handleContinueShopping}
                    >
                        Continue Shopping
                    </button>
                </div>
            ) : (
                <>
                    <div className="cart-items">
                        {cartItems.map((item, index) => (
                            <div
                                className="cart-item"
                                key={`${item.name}-${index}`}
                            >
                                <img
                                    className="cart-item-image"
                                    src={item.image}
                                    alt={item.name}
                                />

                                <div className="cart-item-details">
                                    <h3>{item.name}</h3>

                                    <p>
                                        Unit Price: {item.cost}
                                    </p>

                                    <p>
                                        Subtotal: $
                                        {calculateTotalCost(item).toFixed(2)}
                                    </p>

                                    <div className="quantity-controls">
                                        <button
                                            onClick={() => handleDecrement(item)}
                                            aria-label={`Decrease ${item.name} quantity`}
                                        >
                                            -
                                        </button>

                                        <span>{item.quantity}</span>

                                        <button
                                            onClick={() => handleIncrement(item)}
                                            aria-label={`Increase ${item.name} quantity`}
                                        >
                                            +
                                        </button>
                                    </div>

                                    <button
                                        className="remove-item-button"
                                        onClick={() => handleRemove(item)}
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="cart-summary">
                        <h3>
                            Total Items: {calculateTotalItems()}
                        </h3>

                        <h3>
                            Total Cost: $
                            {calculateTotalAmount().toFixed(2)}
                        </h3>

                        <button
                            className="continue-shopping-button"
                            onClick={handleContinueShopping}
                        >
                            Continue Shopping
                        </button>

                        <button
                            className="checkout-button"
                            onClick={handleCheckoutShopping}
                        >
                            Checkout
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}

export default CartItem;
