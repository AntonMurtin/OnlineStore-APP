import './home.css';

import { useEffect, useState, lazy, Suspense } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { useAuthContext } from '../../../context/AuthContext';
import { productServiceFactory } from '../../../sevices/productService';

import { Loading } from '../../cardComponents/loading/Loading';
import { productName, productType } from '../../../config/constants/constants';
import homeData from '../../../config/data/homeData';

const Carousel = lazy(() => import('../../swiperComponents/carousel/Carousel'));

import Slider from '../../swiperComponents/slider/Slider';

const Home = () => {
    const productService = productServiceFactory();

    const { userId } = useAuthContext();


    const [waterpumps, setWaterpumps] = useState([]);
    const [irigationSystems, setIrigationSystems] = useState([]);
    const [parts, setParts] = useState([]);
    const [powerMachines, setPowerMachines] = useState([]);
    const [pipes, setPipes] = useState([]);
    const [tools, setTools] = useState([]);
    const [lastSeenProducts, setLastSeenProducts] = useState([]);

    const [productLoading, setProductLoading] = useState(true);
    const [seenloading, setSeenloading] = useState(false);

    const { pathname } = useLocation();

    useEffect(() => {

        window.scrollTo(0, 0);
    }, [pathname]);

    useEffect(() => {
        setProductLoading(true);
        Promise.all([
            productService.getAll(productType.waterpumps),
            productService.getAll(productType.irigationSystems),
            productService.getAll(productType.parts),
            productService.getAll(productType.powerMachines),
            productService.getAll(productType.pipes),
            productService.getAll(productType.tools),

        ]).then(([
            waterpumpsProducts,
            irigationSystemsProducts,
            partsProducts,
            powerMachinesProducts,
            pipesProducts,
            toolsProducts,
        ]) => {
            setWaterpumps(waterpumpsProducts);
            setIrigationSystems(irigationSystemsProducts);
            setParts(partsProducts);
            setPowerMachines(powerMachinesProducts);
            setPipes(pipesProducts);
            setTools(toolsProducts);
        })
        setProductLoading(false);
    }, [pathname]);

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
    }, [pathname]);

    return (
        <div className="home_page">
            <div className="topContent">
                <h2>Products & Services from Rain Systems</h2>
                <Suspense fallback={<Loading />}>
                    {<Carousel data={homeData} />}
                </Suspense>
            </div>


            <div className='productContent'>
                <h2>{productName.waterpumps}</h2>
                {productLoading && (<Loading />)}
                {!productLoading && waterpumps.length > 0 && (
                    <>
                        {<Slider data={waterpumps} />}
                        <Link className='goTo' to="/shop/waterpumps">See all</Link>
                    </>
                )}
            </div>

            <div className='productContent'>
                <h2>{productName.irigationSystems}</h2>
                {productLoading && (<Loading />)}
                {!productLoading && irigationSystems.length > 0 && (
                    <>
                        {<Slider data={irigationSystems} />}
                        <Link className='goTo' to="/shop/irigationSystems">See all</Link>
                    </>
                )}
            </div>

            <div className='productContent'>
                <h2>{productName.parts}</h2>
                {productLoading && (<Loading />)}
                {!productLoading && parts.length > 0 &&(
                    <>
                    {<Slider data={parts} />}
                    <Link className='goTo' to="/shop/parts">See all</Link>
                    </>
                )}
            </div>

            <div className='productContent'>
                <h2>{productName.powerMachines}</h2>
                {productLoading && (<Loading />)}
                {!productLoading && powerMachines.length > 0 &&(
                    <>
                    {<Slider data={powerMachines} />}
                    <Link className='goTo' to="/shop/powerMachines">See all</Link>
                    </>
                )}
            </div>

            <div className='productContent'>
                <h2>{productName.pipes}</h2>
                {productLoading && (<Loading />)}
                {!productLoading && pipes.length > 0 &&(
                    <>
                    {<Slider data={pipes} />}
                    <Link className='goTo' to="/shop/pipes">See all</Link>
                    </>
                )}
            </div>

            <div className='productContent'>
                <h2>{productName.tools}</h2>
                {productLoading && (<Loading />)}
                {!productLoading && tools.length > 0 &&(
                    <>
                    {<Slider data={tools} />}
                    <Link className='goTo' to="/shop/tools">See all</Link>
                    </>
                )}
            </div>
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

export default Home;