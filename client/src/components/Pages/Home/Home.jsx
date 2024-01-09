import React from 'react'
import './Home.css'
import Carousel from './Carousel/Carousel'
import data from '../../../config/constants'

const Home = () => {
    return (
        <div className="home_page">
            <div className="topContent">
                <h2>Places to Meet</h2>
                <p>After you Like &amp; Subscribe!</p>
            </div>
            <div className="carousel">

        {<Carousel data={data}/>}
            </div>
       
        </div>
    )
}

export default Home