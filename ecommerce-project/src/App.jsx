import {HomePage} from './pages/HomePage.jsx';
import {CheckoutPage} from './pages/checkout/CheckoutPage.jsx'
import { OrdersPage } from './pages/OrderPage.jsx';
import { TrackingPage } from './pages/TrackingPage.jsx';
import {Routes,Route} from 'react-router';
import './App.css';

function App() {

  return (
    <>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="checkout" element={<CheckoutPage />} />
        <Route path="orders" element={<OrdersPage />} />
        <Route path="tracking" element={<TrackingPage />} />
      </Routes>
    </>
  )
}

export default App
