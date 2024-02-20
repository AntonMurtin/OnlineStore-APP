import './buyProducts.css'
import { lazy, Suspense, useEffect } from 'react';

import { useProductContext } from '../../../context/ProductContext';
import { useLocation } from 'react-router-dom';
import { Loading } from '../../cardComponents/loading/Loading';

const BuyCard = lazy(() => import('../../cardComponents/buyCard/BuyCard'));

const BuyProducts = () => {
  const { buysProducts, totalPrice } = useProductContext();

  const { pathname } = useLocation();


  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (

    <section className='buyProductPage'>

      <h2 className='buyTitle'>Shoping Bag</h2>
      <div className="buyProducts">
        <div className='buySize'>
          <Suspense fallback={<Loading />}>
            {buysProducts.map(x => <BuyCard key={x._id} {...x} />)}
          </Suspense>
        </div>

        <div className='subtotal'>{`Subtotal: ${buysProducts.length > 0 ? totalPrice : 0} $`}</div>
        <div className='buyBtnDiv' >
          <button id='buybtn'>BUY</button>
        </div>
      </div>




    </section>
  )
}

export default BuyProducts;