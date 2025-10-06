import formatMoney from "../../utils/money.js"
import { useEffect,useState } from "react"
import {useNavigate} from 'react-router'
import axios from 'axios';

export function PaymentSummary({cart, loadData}) {
  const [paymentSummary, setPaymentSummary] = useState(null)

  useEffect(() => {
    async function getPaymentData() {
      const paymentSummaryResponse = await axios.get('/api/payment-summary')
      setPaymentSummary(paymentSummaryResponse.data)
    }
    getPaymentData()
  }, [cart])

  const navigate = useNavigate()

  async function CreateOrder(){
    await axios.post('api/orders')
    await loadData()
    navigate('/orders')
  }

  return (
    <>
      <div className="payment-summary-title">Payment Summary</div>

      {paymentSummary && (
        <>
          <div className="payment-summary-row">
            <div>Items ({paymentSummary.totalItems}):</div>
            <div className="payment-summary-money">
              ${formatMoney(paymentSummary.productCostCents)}
            </div>
          </div>

          <div className="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div className="payment-summary-money">
              ${formatMoney(paymentSummary.shippingCostCents)}
            </div>
          </div>

          <div className="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div className="payment-summary-money">
              ${formatMoney(paymentSummary.totalCostBeforeTaxCents)}
            </div>
          </div>

          <div className="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div className="payment-summary-money">
              ${formatMoney(paymentSummary.taxCents)}
            </div>
          </div>

          <div className="payment-summary-row total-row">
            <div>Order total:</div>
            <div className="payment-summary-money">
              ${formatMoney(paymentSummary.totalCostCents)}
            </div>
          </div>

          <button className="place-order-button button-primary"
          onClick={CreateOrder}>
            Place your order
          </button>
        </>
      )}
    </>
  )
}