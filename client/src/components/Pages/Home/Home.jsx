import './Home.css';

import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom' ;

import { Carousel } from '../../SwiperComponents/Carousel/Carousel';
import { Slider } from '../../SwiperComponents/Slider/Slider';

import homeData from '../../../config/data/homeData';
import { productName ,productType } from '../../../config/constants/constants'; 
import { productServiceFactory } from '../../../sevices/productService';


const Home = () => {
const productService=productServiceFactory()

    const [waterpomps, setWaterpomps] = useState([]);
    const [irigationSystems, setIrigationSystems] = useState([]);
    const [parts, setParts] = useState([]);
    const [powerMachines, setPowerMachines] = useState([]);
    const [pipes, setPipes] = useState([]);
    const [tools, setTools] = useState([]);

    const {pathname}=useLocation()

     useEffect(()=>{
        window.scrollTo(0,0);
     },[pathname]);

     useEffect(() => {
        Promise.all([
            productService.getAll(productType.waterpomps),
            productService.getAll(productType.irigationSystems),
            productService.getAll(productType.parts),
            productService.getAll(productType.powerMachines),
            productService.getAll(productType.pipes),
            productService.getAll(productType.tools),

        ]).then(([
            waterpompsProducts,
            irigationSystemsProducts,
            partsProducts,
            powerMachinesProducts,
            pipesProducts,
            toolsProducts,
        ]) => {
            setWaterpomps(waterpompsProducts);
            setIrigationSystems(irigationSystemsProducts);
            setParts(partsProducts);
            setPowerMachines(powerMachinesProducts);
            setPipes(pipesProducts);
            setTools(toolsProducts);
            // setProduct([
            //     waterpompsProducts[0],
            //     irigationSystemsProducts[0],
            //     partsProducts[0],
            //     powerMachinesProducts[0],
            //     pipesProducts[0],
            //     toolsProducts[0],
            // ])
        })
    }, [pathname]);

    return (
        <div className="home_page">
            <div className="topContent">
                <h2>Places to Meet</h2>
                <p>After you Like &amp; Subscribe!</p>
                {<Carousel data={homeData} />}
            </div>
           
            <div className='productContent'>
            <h2>{productName.waterpomps}</h2>
            {<Slider data={waterpomps}  />}
            <Link className='goTo' to="/shop/waterpomps">See all</Link>
            </div>

            <div className='productContent'>
            <h2>{productName.irigationSystems}</h2>
            {<Slider data={irigationSystems}  />}
            <Link className='goTo' to="/shop/irigationSystems">See all</Link>
            </div>

            <div className='productContent'>
            <h2>{productName.parts}</h2>
            {<Slider data={parts}  />}
            <Link className='goTo' to="/shop/parts">See all</Link>
            </div>

            <div className='productContent'>
            <h2>{productName.powerMachines}</h2>
            {<Slider data={powerMachines}  />}
            <Link className='goTo' to="/shop/powerMachines">See all</Link>
            </div>

            <div className='productContent'>
            <h2>{productName.pipes}</h2>
            {<Slider data={pipes}  />}
            <Link className='goTo' to="/shop/pipes">See all</Link>
            </div>

            <div className='productContent'>
            <h2>{productName.tools}</h2>
            {<Slider data={tools}  />}
            <Link className='goTo' to="/shop/tools">See all</Link>
            </div>

            {/* <div className='productContent'>
            <h2>Last Seen</h2>
            {<Slider data={product}  />}
            <Link className='goTo' to="/">See all</Link>
            </div> */}
        </div>
    )
}

export default Home;