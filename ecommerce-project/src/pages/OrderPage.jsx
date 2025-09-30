import axios from 'axios';
import { useState, useEffect, Fragment } from 'react';
import { Header } from './components/header.jsx'
import formatMoney from '../utils/money.js'
import './OrderPage.css'
import dayjs from 'dayjs';

export function OrdersPage({ cart }) {
  const [orders, setOrders] = useState([])

  useEffect(() => {
    axios.get('/api/orders?expand=products')
      .then((response) => {
        setOrders(response.data)
      })
  }, [])

  return (
    <>
      <title>Orders</title>

      <Header cart={cart} />

      <div className="orders-page">
        <div className="page-title">Your Orders</div>

        <div className="orders-grid">
          {
            (orders.length > 0 && orders.map((order) => {
              return (
                <div className="order-container" key={order.id}>

                  <div className="order-header">
                    <div className="order-header-left-section">
                      <div className="order-date">
                        <div className="order-header-label">Order Placed:</div>
                        <div>{dayjs(order.orderTimeMs).format('dddd, MMMM D')}</div>
                      </div>
                      <div className="order-total">
                        <div className="order-header-label">Total:</div>
                        <div>${formatMoney(order.totalCostCents)}</div>
                      </div>
                    </div>

                    <div className="order-header-right-section">
                      <div className="order-header-label">Order ID:</div>
                      <div>{order.id}</div>
                    </div>
                  </div>

                  <div className="order-details-grid">
                    {order.products.map((product) => {
                      return (
                        <Fragment key={product.id}>
                          <div className="product-image-container">
                            <img src={product.product.image} />
                          </div>

                          <div className="product-details">
                            <div className="product-name">
                              {product.product.name}
                            </div>
                            <div className="product-delivery-date">
                              Arriving on: {dayjs(product.estimatedDeliveryTimeMs).format('dddd, MMMM D')}
                            </div>
                            <div className="product-quantity">
                              Quantity: {product.quantity}
                            </div>
                            <button className="buy-again-button button-primary">
                              <img className="buy-again-icon" src="images/icons/buy-again.png" />
                              <span className="buy-again-message">Add to Cart</span>
                            </button>
                          </div>

                          <div className="product-actions">
                            <a href="/tracking">
                              <button className="track-package-button button-secondary">
                                Track package
                              </button>
                            </a>
                          </div>
                        </Fragment>
                      )
                    })}
                  </div>
                </div>
              )
            }))
          }
        </div>
      </div>
    </>
  )
}

