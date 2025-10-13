import {HomePage} from './pages/Home/HomePage';
import {CheckoutPage} from './pages/checkout/CheckoutPage'
import { OrdersPage } from './pages/OrderPage';
import { TrackingPage } from './pages/TrackingPage';
import {Routes,Route} from 'react-router';
import {useState, useEffect} from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [cart, setCart] = useState([])
  const [products,setProducts] = useState([])
  
  const loadData = async ()=>{
    const productResponse = await axios.get('/api/products');
    setProducts(productResponse.data)
  
    const cartResponse = await axios.get('/api/cart-items?expand=product')
    setCart(cartResponse.data)
  };

  useEffect(()=>{
    loadData();
  },[])

  return (
    <>
      <Routes>
        <Route index element={<HomePage cart={cart} loadData={loadData} />} />
        <Route path="checkout" element={<CheckoutPage cart={cart} loadData={loadData} />} />
        <Route path="orders" element={<OrdersPage cart={cart} />}  />
        <Route path="tracking" element={<TrackingPage cart={cart} />} />
      </Routes>
    </>
  )
}

export default App
