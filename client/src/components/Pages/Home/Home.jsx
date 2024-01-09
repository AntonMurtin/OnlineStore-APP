import './Home.css'

import React from 'react'

import Carousel from './Carousel/Carousel'
import homeData from '../../../config/data/home.js/homeData'

const Home = () => {
    return (
        <div className="home_page">
            <div className="topContent">
                <h2>Places to Meet</h2>
                <p>After you Like &amp; Subscribe!</p>
            </div>
            <div className="carousel">

        {<Carousel data={homeData}/>}
            </div>
       
        </div>
    )
}

export default Home