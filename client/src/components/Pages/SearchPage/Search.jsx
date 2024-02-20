import '../Shop/product.css';
import { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';

import { productServiceFactory } from '../../../sevices/productService';
import { useAuthContext } from '../../../context/AuthContext';

import { productName, productType } from '../../../config/constants/constants';
import { Loading } from '../../cardComponents/loading/Loading';

import ProductCard from '../../cardComponents/productCard/ProductCard';
import Slider from '../../swiperComponents/slider/Slider';



const Search = () => {
    const productService = productServiceFactory();
    const { userId } = useAuthContext();

    const { searchName } = useParams()
    const { pathname } = useLocation();

    const [products, setProducts] = useState([]);
    const [lastSeenProducts, setLastSeenProducts] = useState([]);

    const [productLoading, setProductLoading] = useState(true);
    const [seenloading, setSeenloading] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    useEffect(() => {
        setProductLoading(true)
        if (searchName) {
            Promise.all([
                productService.search(productType.waterpumps, { searchName }),
                productService.search(productType.irigationSystems, { searchName }),
                productService.search(productType.parts, { searchName }),
                productService.search(productType.powerMachines, { searchName }),
                productService.search(productType.pipes, { searchName }),
                productService.search(productType.tools, { searchName }),

            ]).then(([
                waterpumpsData,
                systemsData,
                partsData,
                machinesData,
                pipesData,
                toolsData,
            ]) => {
                setProducts([
                    ...waterpumpsData,
                    ...systemsData,
                    ...partsData,
                    ...machinesData,
                    ...pipesData,
                    ...toolsData,
                ]);
            });
        }
        setProductLoading(false);
    }, [searchName]);

    useEffect(() => {
        setSeenloading(true);
        if (userId) {
            Promise.all([
                productService.getLastSeen(productType.waterpumps, userId),
                productService.getLastSeen(productType.irigationSystems, userId),
                productService.getLastSeen(productType.parts, userId),
                productService.getLastSeen(productType.powerMachines, userId),
                productService.getLastSeen(productType.pipes, userId),
                productService.getLastSeen(productType.tools, userId),
            ]).then(([
                waterpumpsgetSeen,
                irigationSystemsgetSeen,
                partsgetSeen,
                powerMachinesgetSeen,
                pipesgetSeen,
                toolsgetSeen,
            ]) => {
                setLastSeenProducts([
                    ...waterpumpsgetSeen,
                    ...irigationSystemsgetSeen,
                    ...partsgetSeen,
                    ...powerMachinesgetSeen,
                    ...pipesgetSeen,
                    ...toolsgetSeen,
                ]);
            });
        };
        setSeenloading(false);
    }, [products]);

    return (
        <div className="page">
            <div className="productPage">
                {!productLoading && products.length > 0 && products.map(x =>
                    <ProductCard key={x._id} {...x} />
                )}
                {productLoading && (<Loading />)}
            </div>
            {!productLoading && products.length === 0 && (
                <p className="noProduct">There are no Products !</p>
            )}
            {lastSeenProducts.length > 2 && (
                <>
                    <div className='productContent'>
                        <h2>{productName.lastSeen}</h2>
                        {seenloading && (<Loading />)}
                        {!seenloading && (
                            <>
                                {<Slider data={lastSeenProducts} />}
                                <Link className='goTo' to="/lastSeen">See all</Link>
                            </>
                        )}
                    </div>
                </>
            )}
        </div>
    )
}

export default Search;