import formatMoney from "../../utils/money"
import dayjs from 'dayjs'
import axios from 'axios';

export function DeliveryOptions({deliveryOptions, cartItem, loadData}){

  return (
    
    
    deliveryOptions.map((deliveryOption) => {

      async function updateDeliveryOption(){ 
        await axios.put(`/api/cart-items/${cartItem.productId}`, {
          deliveryOptionId: deliveryOption.id
        })
        await loadData()
      }
      return (
        <div key={deliveryOption.id} className="delivery-option" 
        onClick={updateDeliveryOption}>
          <input type="radio"
            checked={deliveryOption.id === cartItem.deliveryOptionId}
            onChange={()=>{}}
            className="delivery-option-input"
            name={`delivery-option-${cartItem.productId}`} />
          <div>
            <div className="delivery-option-date">
              {dayjs(deliveryOption.estimatedDeliveryTimeMs).format('dddd, MMMM D')}
            </div>
            <div className="delivery-option-price">
              {(formatMoney(deliveryOption.priceCents) > 0
                ? `$${formatMoney(deliveryOption.priceCents)} Shipping`
                : 'Free Shipping')}
            </div>
          </div>
        </div>
      )
    })
  )
}