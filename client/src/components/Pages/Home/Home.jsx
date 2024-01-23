import './Home.css';

import { Link } from 'react-router-dom' ;

import Carousel from './Carousel/Carousel';
import homeData from '../../../config/data/homeData';

import { useProductContext } from '../../../context/ProductContext';
import { Slider } from './Slider/Slider';



const Home = () => {
    const { 
        waterpomps, 
        systems, 
        parts,
        machines,
        pipes,
        tools,
        product, 
    } = useProductContext();


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
            {<Slider data={systems}  />}
            <Link className='goTo' to="/shop/irigationSystems">See all</Link>
            </div>

            <div className='productContent'>
            <h2>Parts</h2>
            {<Slider data={parts}  />}
            <Link className='goTo' to="/register">See all</Link>
            </div>

            <div className='productContent'>
            <h2>Power Mashines</h2>
            {<Slider data={machines}  />}
            <Link className='goTo' to="/register">See all</Link>
            </div>

            <div className='productContent'>
            <h2>Pipes</h2>
            {<Slider data={pipes}  />}
            <Link className='goTo' to="/register">See all</Link>
            </div>

            <div className='productContent'>
            <h2>Tools</h2>
            {<Slider data={tools}  />}
            <Link className='goTo' to="/register">See all</Link>
            </div>

            <div className='productContent'>
            <h2>Your Research</h2>
            {<Slider data={product}  />}
            <Link className='goTo' to="/register">See all</Link>
            </div>
        </div>
    )
}

export default Home;