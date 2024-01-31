import React from 'react';
import './BuyProducts.css'
import { useProductContext } from '../../../context/ProductContext'
import { BuyCard } from '../../CardComponents/BuyCard/BuyCard'

const BuyProducts = () => {
    const {buysProducts}=useProductContext()
  return (
    <section className='buyProductPage'>
      <div className="buyProducts">


        <h2>Shoping Bag</h2>

        

        {buysProducts.map(x => <BuyCard key={x._id} {...x} />)}

        {buysProducts.length < 1 && (
          <>
            <div className='details'>
              <p className="buy_size" ><i className="fa-solid fa-cart-shopping fa-5x "><i className='empty'>0</i></i></p>
            </div>
          </>
        )}

        
        <div >

          <div className='subtotal'>Subtotal: $</div>

          <button id='buybtn'>BUY</button>
        </div>
      </div>

    </section>
  )
}

export default BuyProducts