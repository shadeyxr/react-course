import { Product } from "./Product"

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