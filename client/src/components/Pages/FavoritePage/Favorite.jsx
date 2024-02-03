import React, { useEffect } from 'react'
import { useProductContext } from '../../../context/ProductContext'
import { DetailsCard } from '../../CardComponents/DetailsCard/DetailsCard'
import { useLocation } from 'react-router-dom';

const Favorite = () => {
    const { favoriteProducts } = useProductContext();
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
    
    return (
        <section className='page'>

            {favoriteProducts && favoriteProducts.map(x =>
                <DetailsCard key={x._id} {...x} />
            )}
            {favoriteProducts.length === 0 && (
                <p className="noProduct">There are no Favorite yet!</p>
            )}

        </section>
    )
}

export default Favorite;