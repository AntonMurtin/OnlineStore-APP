import './Home.css';

import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { Carousel } from '../../SwiperComponents/Carousel/Carousel';
import { Slider } from '../../SwiperComponents/Slider/Slider';

import homeData from '../../../config/data/homeData';
import { productName, productType } from '../../../config/constants/constants';
import { productServiceFactory } from '../../../sevices/productService';
import { useProductContext } from '../../../context/ProductContext';


const Home = () => {
    const productService = productServiceFactory();
    const { lastSeenProducts } = useProductContext();

    const [waterpumps, setWaterpumps] = useState([]);
    const [irigationSystems, setIrigationSystems] = useState([]);
    const [parts, setParts] = useState([]);
    const [powerMachines, setPowerMachines] = useState([]);
    const [pipes, setPipes] = useState([]);
    const [tools, setTools] = useState([]);

    const { pathname } = useLocation()

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    useEffect(() => {
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
    }, [pathname]);

    return (
        <div className="home_page">
            <div className="topContent">
                <h2>Products & Services from Rain Systems</h2>
               
                {<Carousel data={homeData} />}
            </div>


            <div className='productContent'>
                <h2>{productName.waterpumps}</h2>
                {<Slider data={waterpumps} />}
                <Link className='goTo' to="/shop/waterpumps">See all</Link>
            </div>

            <div className='productContent'>
                <h2>{productName.irigationSystems}</h2>
                {<Slider data={irigationSystems} />}
                <Link className='goTo' to="/shop/irigationSystems">See all</Link>
            </div>

            <div className='productContent'>
                <h2>{productName.parts}</h2>
                {<Slider data={parts} />}
                <Link className='goTo' to="/shop/parts">See all</Link>
            </div>

            <div className='productContent'>
                <h2>{productName.powerMachines}</h2>
                {<Slider data={powerMachines} />}
                <Link className='goTo' to="/shop/powerMachines">See all</Link>
            </div>

            <div className='productContent'>
                <h2>{productName.pipes}</h2>
                {<Slider data={pipes} />}
                <Link className='goTo' to="/shop/pipes">See all</Link>
            </div>

            <div className='productContent'>
                <h2>{productName.tools}</h2>
                {<Slider data={tools} />}
                <Link className='goTo' to="/shop/tools">See all</Link>
            </div>
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

export default Home;