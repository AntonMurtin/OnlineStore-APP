import '../Shop/product.css';
import { useEffect, useState} from 'react';
import { Link, useLocation } from 'react-router-dom';

import { productServiceFactory } from '../../../sevices/productService';
import { useAuthContext } from '../../../context/AuthContext';
import { useProductContext } from '../../../context/ProductContext';

import { productName, productType } from '../../../config/constants/constants';
import { Loading } from '../../cardComponents/loading/Loading';

import  DetailsCard from'../../cardComponents/detailsCard/DetailsCard';
import Slider from'../../swiperComponents/slider/Slider';


const Favorite = () => {
    const productService = productServiceFactory();

    const { userId } = useAuthContext();
    const { favoriteProducts } = useProductContext();

    const [lastSeenProducts, setLastSeenProducts] = useState([]);
    const [productLoading, setProductLoading] = useState(true);

    const { pathname } = useLocation();


    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    useEffect(() => {
        setProductLoading(true);
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
        setProductLoading(false);
    }, [pathname]);
    return (
        <section className='page'>
            {productLoading && (<Loading />)}
                {!productLoading && favoriteProducts.length > 0 && favoriteProducts.map(x =>
                    <DetailsCard key={x._id} {...x} />
                )}
            
            {!productLoading && favoriteProducts.length === 0 && (
                <p className="noProduct">There are no Favorite yet!</p>
            )}
            {lastSeenProducts.length > 2 && (
                <>
                    <div className='productContent'>
                        <h2>{productName.lastSeen}</h2>
                        {productLoading && (<Loading />)}
                        {!productLoading && (
                            <>
                            {<Slider data={lastSeenProducts} />}
                            <Link className='goTo' to="/lastSeen">See all</Link>
                            </>
                        )}
                    </div>
                </>
            )}
        </section>
    );
};

export default Favorite;