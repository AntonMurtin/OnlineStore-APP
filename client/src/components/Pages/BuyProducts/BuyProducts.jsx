import React from 'react';
import './BuyProducts.css'
import { useProductContext } from '../../../context/ProductContext'
import { BuyCard } from '../../CardComponents/BuyCard/BuyCard'

const BuyProducts = () => {
  const { buysProducts ,totalPrice } = useProductContext()
  return (
    
    <section className='buyProductPage'>

      {buysProducts.length > 0 && (
        <>
          <h2 className='buyTitle'>Shoping Bag</h2>
          <div className="buyProducts">
            <div className='buySize'>

              {buysProducts.map(x => <BuyCard key={x._id} {...x} />)}
            </div>

            <div className='subtotal'>{`Subtotal: ${totalPrice} $`}</div>
            <div className='buyBtnDiv' >
              <button id='buybtn'>BUY</button>
            </div>
          </div>
        </>
      )}


      {buysProducts.length === 0 && (
      
         <p className="noProduct">There are no Products yet!</p>
        
      )}

    </section>
  )
}

export default BuyProducts