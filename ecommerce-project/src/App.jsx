import {HomePage} from './pages/Home/HomePage.jsx';
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
        <Route index element={<HomePage cart={cart} products={products} loadData={loadData} />} />
        <Route path="checkout" element={<CheckoutPage cart={cart} products={products} />} />
        <Route path="orders" element={<OrdersPage cart={cart} />}  />
        <Route path="tracking" element={<TrackingPage />} />
      </Routes>
    </>
  )
}

export default App
