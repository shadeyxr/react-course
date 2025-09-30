import {HomePage} from './pages/HomePage.jsx';
import {CheckoutPage} from './pages/checkout/CheckoutPage.jsx'
import { OrdersPage } from './pages/OrderPage.jsx';
import { TrackingPage } from './pages/TrackingPage.jsx';
import {Routes,Route} from 'react-router';
import {useState, useEffect} from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [cart, setCart] = useState([])
  const [products,setProducts] = useState([])
  
  useEffect(()=>{
    axios.get('/api/products')
    .then((response)=>{
      setProducts(response.data)
    })
    axios.get('/api/cart-items?expand=product')
      .then((response)=>{
        setCart(response.data)
      })
  },[])

  

  return (
    <>
      <Routes>
        <Route index element={<HomePage cart={cart} products={products} />} />
        <Route path="checkout" element={<CheckoutPage cart={cart} products={products} />} />
        <Route path="orders" element={<OrdersPage />} />
        <Route path="tracking" element={<TrackingPage />} />
      </Routes>
    </>
  )
}

export default App
