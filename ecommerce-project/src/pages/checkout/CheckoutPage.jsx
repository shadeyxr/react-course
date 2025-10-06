import { PaymentSummary } from './PaymentSummary.jsx';
import { OrderSummary } from './OrderSummary.jsx';
import { CheckoutHeader } from './CheckoutHeader.jsx';
import { useState, useEffect } from 'react';
import axios from 'axios';

import './checkout-header.css'
import './checkout.css'

export function CheckoutPage({ cart, loadData }) {
  const [deliveryOptions, setDeliveryOptions] = useState([])
  

  useEffect(() => {
    async function getCheckoutData(){
      const deliveryOptionResponse = await axios.get('/api/delivery-options?expand=estimatedDeliveryTime')
      setDeliveryOptions(deliveryOptionResponse.data)
    }
    getCheckoutData()
  }, [])
  return (
    <>
      <title>Checkout</title>

      <CheckoutHeader />

      <div className="checkout-page">
        <div className="page-title">Review your order</div>

        <div className="checkout-grid">

          <div className="order-summary">
            <OrderSummary deliveryOptions={deliveryOptions} cart={cart} loadData={loadData} />
          </div>

          <div className="payment-summary">
            <PaymentSummary cart={cart} />
          </div>

        </div>
      </div>
    </>
  )
}