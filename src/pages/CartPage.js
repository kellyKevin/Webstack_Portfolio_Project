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
    <div className="page-container container">
      <button onClick={() => navigate('/products')} className="back-btn">← Back to Shop</button>

      <h1 className="page-title">Your Shopping Cart</h1>

      <div className="content-section cart-container">
        {cart.length > 0 ? (
          <>
            <div className="cart-list">
              {cart.map((item, index) => (
                <div key={index} className="cart-item">
                  <img src={item.image} alt={item.name} />
                  <div className="cart-item-info">
                    <h4>{item.name}</h4>
                    <p>ksh{item.price.toFixed(2)}</p>
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
              ))}
            </div>

            <div className="cart-summary">
                <div className="cart-total-value">Total: ksh{total.toFixed(2)}</div>

                <div className="payment-methods" style={{ width: '100%', marginBottom: '1.5rem' }}>
                    <h4 style={{ marginBottom: '1rem' }}>Select a Payment Method:</h4>
                    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                        <label className="form-group" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <input type="radio" name="payment-method" value="card" onChange={handlePaymentMethodChange} /> Card
                        </label>
                        <label className="form-group" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <input type="radio" name="payment-method" value="mobile" onChange={handlePaymentMethodChange} /> Mobile
                        </label>
                        <label className="form-group" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <input type="radio" name="payment-method" value="paypal" onChange={handlePaymentMethodChange} /> PayPal
                        </label>
                    </div>
                </div>

                {paymentMethod === 'card' && (
                    <div className="auth-form" style={{ width: '100%', maxWidth: 'none', background: 'none', padding: 0, boxShadow: 'none' }}>
                        <div className="form-group">
                            <input type="text" className="form-input" id="cardNumber" value={cardDetails.cardNumber} onChange={handleCardDetailChange} placeholder="Card Number" />
                        </div>
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <div className="form-group" style={{ flex: 1 }}>
                                <input type="text" className="form-input" id="cardExpiry" value={cardDetails.cardExpiry} onChange={handleCardDetailChange} placeholder="MM/YY" />
                            </div>
                            <div className="form-group" style={{ flex: 1 }}>
                                <input type="text" className="form-input" id="cardCvv" value={cardDetails.cardCvv} onChange={handleCardDetailChange} placeholder="CVV" />
                            </div>
                        </div>
                    </div>
                )}

                {paymentMethod === 'mobile' && (
                    <div className="form-group" style={{ width: '100%' }}>
                        <input type="text" className="form-input" id="mobile-number" value={mobileNumber} onChange={handlePaymentDetailChange} placeholder="Mobile Number (e.g. 07...)" />
                    </div>
                )}

                {paymentMethod === 'paypal' && (
                    <div className="form-group" style={{ width: '100%' }}>
                        <input type="email" className="form-input" id="paypal-email" value={paypalEmail} onChange={handlePaymentDetailChange} placeholder="PayPal Email" />
                    </div>
                )}

                <button className="checkout-btn" onClick={proceedToPayment}>Complete Purchase</button>
            </div>
          </>
        ) : (
          <div style={{ textAlign: 'center', padding: '3rem' }}>
            <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', marginBottom: '2rem' }}>Your cart is currently empty.</p>
            <button onClick={() => navigate('/products')} className="checkout-btn">Start Shopping</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
