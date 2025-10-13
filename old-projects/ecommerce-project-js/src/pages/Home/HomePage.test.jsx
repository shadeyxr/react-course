import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import userEvent from '@testing-library/user-event'
import { HomePage } from './HomePage.jsx'
import axios from 'axios';

vi.mock('axios')

describe('HomePage Component', () => {
  let loadData;

  beforeEach(() => {
    loadData = vi.fn();

    axios.get.mockImplementation(async (urlPath) => {
      if (urlPath === '/api/products') {
        return {
          data: [{
            id: "8c9c52b5-5a19-4bcb-a5d1-158a74287c53",
            image: "images/products/3-piece-cooking-set.jpg",
            name: "3 Piece Non-Stick, Black Cooking Pot Set",
            rating: {
              stars: 4.5,
              count: 175
            },
            priceCents: 3499,
            keywords: ["kitchen", "cookware"]
          },
          {
            id: "dd82ca78-a18b-4e2a-9250-31e67412f98d",
            image: "images/products/women-plain-cotton-oversized-sweater-gray.jpg",
            name: "Cotton Oversized Sweater - Gray",
            rating: {
              stars: 4.5,
              count: 317
            },
            priceCents: 2400,
            keywords: ["sweaters", "apparel"]
          }]
        }
      }
    })
  })

  it('displays the products correctly', async () => {
    render(
      <MemoryRouter>
        <HomePage cart={[]} loadData={loadData} />
      </MemoryRouter>
    )

    const productContainers = await screen.findAllByTestId('product-container')

    expect(productContainers.length).toBe(2);

    expect(
      within(productContainers[0]).getByText('3 Piece Non-Stick, Black Cooking Pot Set')
    ).toBeInTheDocument();

    expect(
      within(productContainers[1]).getByTestId('product-image')
    ).toHaveAttribute('src', 'images/products/women-plain-cotton-oversized-sweater-gray.jpg')

  })

  it('adds an item to the cart', async () => {
    render(
      <MemoryRouter>
        <HomePage cart={[]} loadData={loadData} />
      </MemoryRouter>
    )
    const productContainers = await screen.findAllByTestId('product-container')

    const user = userEvent.setup()
    const addButton = await within(productContainers[0]).findByTestId('add-to-cart-button')
    const quantitySelector = await within(productContainers[0]).findByTestId('product-quantity')
    await user.selectOptions(quantitySelector, '3')
    await user.click(addButton);

    expect(axios.post).toHaveBeenCalledWith('/api/cart-items', {
      productId: "8c9c52b5-5a19-4bcb-a5d1-158a74287c53",
      quantity: 3
    })
  })
})