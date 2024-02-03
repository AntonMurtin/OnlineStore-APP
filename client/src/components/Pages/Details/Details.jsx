import React, { useEffect, useState } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'

import { productServiceFactory } from '../../../sevices/productService'
import { DetailsCard } from '../../CardComponents/DetailsCard/DetailsCard'
import { Slider } from '../../SwiperComponents/Slider/Slider'
import { productName } from '../../../config/constants/constants'

const Details = () => {
    const { pathname } = useLocation();
    const { productType, productId } = useParams()
    const productService = productServiceFactory();

    const [product, setProduct] = useState([]);
    const [products, setProducts] = useState([]);
    
    const allProducts = products.filter(x => x._id !== productId);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    useEffect(() => {
        Promise.all([
            productService.getById(productType, productId),
            productService.getAll(productType),
        ]).then(([
            productData,
            productsData,
        ]) => {
            setProduct(productData)
            setProducts(productsData)
        })
    }, [productId])

    return (
        <section className='page'>

            <DetailsCard key={product._id}
               {...product}
                 />

            <div className='productContent'>
                <h2>{productName[productType]}</h2>
                {<Slider data={allProducts} />}
                <Link className='goTo' to={`/shop/${product.type}`}>See all</Link>
            </div>
        </section>

    );
};

export default Details