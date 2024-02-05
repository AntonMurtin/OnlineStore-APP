import React, { useEffect, useState } from 'react';
import { ProductCard } from '../../CardComponents/ProductCard/ProductCard';
import { productType } from '../../../config/constants/constants';
import { productServiceFactory } from '../../../sevices/productService';
import { useProductContext } from '../../../context/ProductContext';
import { Slider } from '../../SwiperComponents/Slider/Slider';
import { Link, useLocation } from 'react-router-dom';


const Search = () => {
    const productService = productServiceFactory();
    const { search, lastSeenProducts } = useProductContext();
    const { pathname } = useLocation()
  
    const [products, setProducts] = useState([]);


    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    useEffect(() => {
        Promise.all([
            productService.search(productType.waterpomps, search),
            productService.search(productType.irigationSystems, search),
            productService.search(productType.parts, search),
            productService.search(productType.powerMachines, search),
            productService.search(productType.pipes, search),
            productService.search(productType.tools, search),

        ]).then(([
            waterpompsData,
            systemsData,
            partsData,
            machinesData,
            pipesData,
            toolsData,
        ]) => {
            setProducts([
                ...waterpompsData,
                ...systemsData,
                ...partsData,
                ...machinesData,
                ...pipesData,
                ...toolsData,
            ]);
        })
    }, [search]);

    return (
        <div className="page">
            <div className="productPage">
                {products && products.map(x =>
                    <ProductCard key={x._id} {...x} />
                )}
            </div>
            {products.length === 0 && (
                <p className="noProduct">There are no Products !</p>
            )}
             {lastSeenProducts.length > 2 && (
                <>
                    <div className='productContent'>
                        <h2>Last Seen</h2>
                        {<Slider data={lastSeenProducts} />}
                        <Link className='goTo' to="/lastSeen">See all</Link>
                    </div>
                </>
            )}
        </div>
    )
}

export default Search