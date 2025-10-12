import {it, expect, describe} from 'vitest';
import formatMoney from './money.js';

describe('formatMoney',()=>{
  it('format 1999 cents as $19.99', ()=>{
    expect(formatMoney(1999)).toBe('19.99')
  })
  
  it('Displays 2 decimals', ()=>{
    expect(formatMoney(1000)).toBe('10.00')
  })

  it('Works with a value of 0', ()=>{
    expect(formatMoney(0)).toBe('0.00')
  })

  
})  


