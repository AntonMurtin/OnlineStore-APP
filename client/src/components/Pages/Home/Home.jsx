import './Home.css'



import Carousel from './Carousel/Carousel'
import homeData from '../../../config/data/homeData'

import { useProductContext } from '../../../context/ProductContext'
import { Slider } from './Slider/Slider'



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
            <h2>Water Pomp</h2>
            {<Slider data={waterpomps}  />}
            </div>

            <div className='productContent'>
            <h2>Water Pomp</h2>
            {<Slider data={systems}  />}
            </div>

            <div className='productContent'>
            <h2>Water Pomp</h2>
            {<Slider data={parts}  />}
            </div>

            <div className='productContent'>
            <h2>Water Pomp</h2>
            {<Slider data={machines}  />}
            </div>

            <div className='productContent'>
            <h2>Water Pomp</h2>
            {<Slider data={pipes}  />}
            </div>

            <div className='productContent'>
            <h2>Water Pomp</h2>
            {<Slider data={tools}  />}
            </div>

            <div className='productContent'>
            <h2>Water Pomp</h2>
            {<Slider data={product}  />}
            </div>
        </div>
    )
}

export default Home