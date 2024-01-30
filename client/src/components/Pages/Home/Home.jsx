import './Home.css';

import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom' ;

import { Carousel } from '../../SwiperComponents/Carousel/Carousel';
import { Slider } from '../../SwiperComponents/Slider/Slider';
import homeData from '../../../config/data/homeData';

import { useProductContext } from '../../../context/ProductContext';


const Home = () => {
    const { 
        waterpomps, 
        irigationSystems, 
        parts,
        powerMachines,
        pipes,
        tools,
        product, 
    } = useProductContext();

   

    const {pathname}=useLocation()

     useEffect(()=>{
        window.scrollTo(0,0);
     },[pathname]);

    return (
        <div className="home_page">
            <div className="topContent">
                <h2>Places to Meet</h2>
                <p>After you Like &amp; Subscribe!</p>
                {<Carousel data={homeData} />}
            </div>
           
            <div className='productContent'>
            <h2>Water Pomp </h2>
            {<Slider data={waterpomps}  />}
            <Link className='goTo' to="/shop/waterpomps">See all</Link>
            </div>

            <div className='productContent'>
            <h2>Irrigation Systems</h2>
            {<Slider data={irigationSystems}  />}
            <Link className='goTo' to="/shop/irigationSystems">See all</Link>
            </div>

            <div className='productContent'>
            <h2>Parts</h2>
            {<Slider data={parts}  />}
            <Link className='goTo' to="/shop/parts">See all</Link>
            </div>

            <div className='productContent'>
            <h2>Power Mashines</h2>
            {<Slider data={powerMachines}  />}
            <Link className='goTo' to="/shop/powerMachines">See all</Link>
            </div>

            <div className='productContent'>
            <h2>Pipes</h2>
            {<Slider data={pipes}  />}
            <Link className='goTo' to="/shop/pipes">See all</Link>
            </div>

            <div className='productContent'>
            <h2>Tools</h2>
            {<Slider data={tools}  />}
            <Link className='goTo' to="/shop/tools">See all</Link>
            </div>

            <div className='productContent'>
            <h2>Last Seen</h2>
            {<Slider data={product}  />}
            <Link className='goTo' to="/">See all</Link>
            </div>
        </div>
    )
}

export default Home;