import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './styles.css';

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
  const navigate = useNavigate();

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const [paymentMethod, setPaymentMethod] = React.useState('');
  const [cardDetails, setCardDetails] = React.useState({ cardNumber: '', cardExpiry: '', cardCvv: '' });
  const [mobileNumber, setMobileNumber] = React.useState('');
  const [paypalEmail, setPaypalEmail] = React.useState('');

  const handlePaymentMethodChange = (e) => setPaymentMethod(e.target.value);
  const handleCardDetailChange = (e) => setCardDetails({ ...cardDetails, [e.target.id]: e.target.value });
  const handlePaymentDetailChange = (e) => {
    const { id, value } = e.target;
    if (id === 'mobile-number') setMobileNumber(value);
    if (id === 'paypal-email') setPaypalEmail(value);
  };

  const proceedToPayment = () => {
    if (!paymentMethod) {
      alert('Please select a payment method.');
      return;
    }
    alert(`Processing ${paymentMethod} payment for ksh${total.toFixed(2)}...`);
    // Clear cart after successful "mock" payment
    clearCart();
    navigate('/products');
  };

  return (
    <div className="container">
      <h3><button onClick={() => navigate('/products')} className="back-btn">Back to Shop</button></h3>

      <div className="cart" id="cart-items">
        {cart.length > 0 ? (
          cart.map((item, index) => (
            <div key={index} className="cart-item">
              <img src={item.image} alt={item.name} />
              <div className="cart-item-info">
                <h4>{item.name}</h4>
                <p>Price: ksh{item.price.toFixed(2)}</p>
              </div>
              <div className="cart-item-quantity">
                <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => updateQuantity(item.id, parseInt(e.target.value, 10))}
                />
              </div>
              <div className="cart-item-remove">
                <button onClick={() => removeFromCart(item.id)}>Remove</button>
              </div>
            </div>
          ))
        ) : (
          <p>Your cart is empty.</p>
        )}
      </div>

      <div className="cart-total">Total: ksh{total.toFixed(2)}</div>

      {cart.length > 0 && (
        <>
          <div className="payment-methods">
            <h4>Select a Payment Method:</h4>
            <label>
              <input type="radio" name="payment-method" value="card" onChange={handlePaymentMethodChange} /> Credit/Debit Card
            </label>
            <label>
              <input type="radio" name="payment-method" value="mobile" onChange={handlePaymentMethodChange} /> Mobile Payment
            </label>
            <label>
              <input type="radio" name="payment-method" value="paypal" onChange={handlePaymentMethodChange} /> PayPal
            </label>
          </div>

          {paymentMethod === 'card' && (
            <div className="payment-details active" id="card-details">
              <h4>Enter Card Details:</h4>
              <input type="text" id="cardNumber" value={cardDetails.cardNumber} onChange={handleCardDetailChange} placeholder="Card Number" />
              <input type="text" id="cardExpiry" value={cardDetails.cardExpiry} onChange={handleCardDetailChange} placeholder="Expiry Date (MM/YY)" />
              <input type="text" id="cardCvv" value={cardDetails.cardCvv} onChange={handleCardDetailChange} placeholder="CVV" />
            </div>
          )}

          {paymentMethod === 'mobile' && (
            <div className="payment-details active" id="mobile-details">
              <h4>Enter Mobile Number:</h4>
              <input type="text" id="mobile-number" value={mobileNumber} onChange={handlePaymentDetailChange} placeholder="Mobile Number" />
            </div>
          )}

          {paymentMethod === 'paypal' && (
            <div className="payment-details active" id="paypal-details">
              <h4>Enter PayPal Email:</h4>
              <input type="email" id="paypal-email" value={paypalEmail} onChange={handlePaymentDetailChange} placeholder="PayPal Email" />
            </div>
          )}

          <button className="checkout-btn" onClick={proceedToPayment}>Proceed to Payment</button>
        </>
      )}
    </div>
  );
};

export default CartPage;
