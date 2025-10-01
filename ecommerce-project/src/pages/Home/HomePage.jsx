import { Header } from '../components/header.jsx'
import { ProductsGrid } from './ProductsGrid.jsx'
import './HomePage.css'

export function HomePage({cart, products}) {

  return (
    <>
      <title>Ecommerce</title>

      <Header cart={cart} />

      <div className="home-page">
        <ProductsGrid products={products} />
      </div>
    </>
  )
}