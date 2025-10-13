import {describe, it, expect, vi, beforeEach} from 'vitest';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import {Product} from './Product.jsx'
import axios from 'axios';

vi.mock('axios'); //mocks whole package

describe('Product component', ()=>{
  
  let loadData;
  let product;
  let user;
 
  beforeEach(()=>{
    user = userEvent.setup();
    loadData = vi.fn();
    product = {
      id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      image: "images/products/athletic-cotton-socks-6-pairs.jpg",
      name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
      rating: {
        stars: 4.5,
        count: 87
      },
      priceCents: 1090,
      keywords: ["socks", "sports", "apparel"]
    }
    
  })
  

  it('displays the product details correctly', ()=>{
    render(<Product product={product} loadData={loadData} />);
    expect(
      screen.getByText('Black and Gray Athletic Cotton Socks - 6 Pairs')
    ).toBeInTheDocument();

    expect(
      screen.getByText('$10.90')
    ).toBeInTheDocument();

    expect(
      screen.getByTestId('product-image')
    ).toHaveAttribute('src', "images/products/athletic-cotton-socks-6-pairs.jpg")

    expect(
      screen.getByTestId('product-rating-stars')
    ).toHaveAttribute('src', `images/ratings/rating-45.png`)

    expect(
      screen.getByText(87)
    ).toBeInTheDocument();
  })

  it('Adds a product to the cart', async ()=>{
    render(<Product product={product} loadData={loadData} />);
    
    const quantitySelector = screen.getByTestId('product-quantity')
    await user.selectOptions(quantitySelector, '3')
    expect(quantitySelector).toHaveValue('3')

    const button = screen.getByTestId('add-to-cart-button');
    await user.click(button);
    expect(axios.post).toHaveBeenCalledWith( // this checks if the mocked function is ran and whether it contains the correct properties
      '/api/cart-items',
      {
        productId:"e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity:3
      }
    )
    expect(loadData).toHaveBeenCalled();
  })
})