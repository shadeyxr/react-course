import { Product } from "./Product.jsx"

export function ProductsGrid({products, loadData }) {
  return (
    <div className="products-grid">
      {products.map((product) => {
        
        return (
          <Product key={product.id} product={product}  loadData={loadData}/>
        )
      })}

    </div>
  )
}