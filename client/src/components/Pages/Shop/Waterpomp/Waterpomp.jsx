import '../Product.css'
import React from 'react'
import { useProductContext } from '../../../../context/ProductContext'
import { ProductCard } from '../../../productCard/productCard'

const Waterpomp = () => {
    const { waterpomps } = useProductContext()
    return (
       <div className="waterpompPage">

            <div className="productPage">

                {waterpomps && waterpomps.map(x =>
                    <ProductCard key={x._id} {...x} />
                )}
                {waterpomps.length === 0 && (
                    <p className="noProduct">There are no Products yet!</p>
                )}
            </div>
       </div>
      
    )
}

export default Waterpomp;