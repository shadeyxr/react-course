import {describe, it, expect, vi, beforeEach} from 'vitest';
import {render, screen} from '@testing-library/react';
import { PaymentSummary } from './PaymentSummary.jsx';
import { MemoryRouter, useLocation } from 'react-router';
import userEvent from '@testing-library/user-event';
import axios from 'axios';

vi.mock('axios')

describe('Payment Summary', ()=>{
  let paymentSummary;
  let loadData;

  beforeEach(()=>{
    loadData = vi.fn()
    paymentSummary = 
      {"totalItems":1,"productCostCents":4500,"shippingCostCents":670,"totalCostBeforeTaxCents":5170,"taxCents":500,"totalCostCents":5175}
  })

  it('Renders correct details', ()=>{
    render(
      <MemoryRouter>
        <PaymentSummary paymentSummary={paymentSummary} loadData={loadData} />
      </MemoryRouter>
    )

    expect(
      screen.getByText('$45.00')
    ).toBeInTheDocument()
    expect(
      screen.getByText('$6.70')
    ).toBeInTheDocument()
    expect(
      screen.getByText('$51.70')
    ).toBeInTheDocument()
    expect(
      screen.getByText('$5.00')
    ).toBeInTheDocument()
    expect(
      screen.getByText('$51.75')
    ).toBeInTheDocument()
  })

  it('Places an order correctly', async ()=>{

    function Location(){
      const location = useLocation();
      return <div data-testid="url-path">{location.pathname}</div>
    }

    render(
      <MemoryRouter>
        <PaymentSummary paymentSummary={paymentSummary} loadData={loadData} />
        <Location />
      </MemoryRouter>
    )

    const placeOrderButton = screen.getByTestId('order-button')
    const user = userEvent.setup()
    await user.click(placeOrderButton)

    expect(axios.post).toHaveBeenCalledWith('api/orders')
    expect(screen.getByTestId('url-path')).toHaveTextContent('/orders')

  })
})