import { PaymentSummary } from './PaymentSummary';
import { OrderSummary } from './OrderSummary';
import { CheckoutHeader } from './CheckoutHeader';
import { useState, useEffect } from 'react';
import axios from 'axios';

import './checkout-header.css'
import './checkout.css'

export function CheckoutPage({ cart, loadData }) {
  const [deliveryOptions, setDeliveryOptions] = useState([])
  
  const [paymentSummary, setPaymentSummary] = useState(null)

  useEffect(() => {
    async function getPaymentData() {
      const paymentSummaryResponse = await axios.get('/api/payment-summary')
      setPaymentSummary(paymentSummaryResponse.data)
    }
    getPaymentData()
  }, [cart])

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
            <PaymentSummary paymentSummary={paymentSummary} loadData={loadData} />
          </div>

        </div>
      </div>
    </>
  )
}