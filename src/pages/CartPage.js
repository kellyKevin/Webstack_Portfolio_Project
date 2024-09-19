import React, { useState, useEffect } from 'react';
import './styles.css'; // Import your CSS file here

const CartPage = () => {
  // State Management
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [cardDetails, setCardDetails] = useState({ cardNumber: '', cardExpiry: '', cardCvv: '' });
  const [mobileNumber, setMobileNumber] = useState('');
  const [paypalEmail, setPaypalEmail] = useState('');

  // Load cart data and calculate total on component mount
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(storedCart);
    calculateTotal(storedCart);
  }, []);

  // Calculate total price of items in the cart
  const calculateTotal = (cartItems) => {
    const totalAmount = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setTotal(totalAmount);
  };

  // Handle payment method changes
  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  // Handle card detail changes
  const handleCardDetailChange = (e) => {
    setCardDetails({ ...cardDetails, [e.target.id]: e.target.value });
  };

  // Handle payment detail changes for mobile and PayPal
  const handlePaymentDetailChange = (e) => {
    const { id, value } = e.target;
    if (id === 'mobile-number') setMobileNumber(value);
    if (id === 'paypal-email') setPaypalEmail(value);
  };

  // Proceed to payment based on selected method
  const proceedToPayment = () => {
    if (!paymentMethod) {
      alert('Please select a payment method.');
      return;
    }
    processPayment(paymentMethod);
  };

  // Process payment based on method
  const processPayment = (method) => {
    switch (method) {
      case 'card':
        const { cardNumber, cardExpiry, cardCvv } = cardDetails;
        if (!cardNumber || !cardExpiry || !cardCvv) {
          alert('Please enter all card details.');
          return;
        }
        alert(`Processing card payment for ksh${total.toFixed(2)}...`);
        // Integrate real card payment processing logic here
        break;

      case 'mobile':
        if (!mobileNumber) {
          alert('Please enter your mobile number.');
          return;
        }
        alert(`Processing mobile payment for ksh${total.toFixed(2)}...`);
        // Integrate real mobile payment processing logic here
        break;

      case 'paypal':
        if (!paypalEmail) {
          alert('Please enter your PayPal email.');
          return;
        }
        alert(`Processing PayPal payment for ksh${total.toFixed(2)}...`);
        // Integrate real PayPal payment processing logic here
        break;

      default:
        alert('Invalid payment method.');
    }
  };

  return (
    <div className="container">
      <h3><a href="/products">Back to Shop</a></h3>

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
                <input type="number" value={item.quantity} readOnly />
              </div>
            </div>
          ))
        ) : (
          <p>Your cart is empty.</p>
        )}
      </div>

      <div className="cart-total">Total: ksh{total.toFixed(2)}</div>

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
        <div className="payment-details" id="card-details">
          <h4>Enter Card Details:</h4>
          <input type="text" id="card-number" value={cardDetails.cardNumber} onChange={handleCardDetailChange} placeholder="Card Number" />
          <input type="text" id="card-expiry" value={cardDetails.cardExpiry} onChange={handleCardDetailChange} placeholder="Expiry Date (MM/YY)" />
          <input type="text" id="card-cvv" value={cardDetails.cardCvv} onChange={handleCardDetailChange} placeholder="CVV" />
        </div>
      )}

      {paymentMethod === 'mobile' && (
        <div className="payment-details" id="mobile-details">
          <h4>Enter Mobile Number:</h4>
          <input type="text" id="mobile-number" value={mobileNumber} onChange={handlePaymentDetailChange} placeholder="Mobile Number" />
        </div>
      )}

      {paymentMethod === 'paypal' && (
        <div className="payment-details" id="paypal-details">
          <h4>Enter PayPal Email:</h4>
          <input type="email" id="paypal-email" value={paypalEmail} onChange={handlePaymentDetailChange} placeholder="PayPal Email" />
        </div>
      )}

      <button className="checkout-btn" onClick={proceedToPayment}>Proceed to Payment</button>
    </div>
  );
};

export default CartPage;
