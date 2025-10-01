import { PaymentSummary } from './PaymentSummary.jsx';
import { OrderSummary } from './OrderSummary.jsx';
import { CheckoutHeader } from './CheckoutHeader.jsx';
import { useState, useEffect } from 'react';
import axios from 'axios';

import './checkout-header.css'
import './checkout.css'

export function CheckoutPage({ cart }) {
  const [deliveryOptions, setDeliveryOptions] = useState([])
  const [paymentSummary, setPaymentSummary] = useState(null)

  useEffect(() => {
    axios.get('/api/delivery-options?expand=estimatedDeliveryTime')
      .then((response) => {
        setDeliveryOptions(response.data)
      })

    axios.get('/api/payment-summary')
      .then((response) => {
        setPaymentSummary(response.data)
      })
  }, [])
  return (
    <>
      <title>Checkout</title>

      <CheckoutHeader />

      <div className="checkout-page">
        <div className="page-title">Review your order</div>

        <div className="checkout-grid">

          <div className="order-summary">
            <OrderSummary deliveryOptions={deliveryOptions} cart={cart} />
          </div>

          <div className="payment-summary">
            <PaymentSummary paymentSummary={paymentSummary} />
          </div>



        </div>
      </div>
    </>
  )
}