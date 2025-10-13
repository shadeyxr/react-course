import { Header } from '../components/header.jsx'
import { ProductsGrid } from './ProductsGrid.jsx'
import {useState, useEffect} from 'react';
import axios from 'axios';
import './HomePage.css'

export function HomePage({cart, loadData}) {

  const [products,setProducts] = useState([])
  
  const loadProducts = async ()=>{
    const productResponse = await axios.get('/api/products');
    setProducts(productResponse.data)
  };

  useEffect(()=>{
    loadProducts()
  },[])

  return (
    <>
      <title>Ecommerce</title>

      <Header cart={cart} />

      <div className="home-page">
        <ProductsGrid products={products} loadData={loadData} />
      </div>
    </>
  )
}