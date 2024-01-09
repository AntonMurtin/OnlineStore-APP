import React from 'react'
import './Shop.css'
import { Link } from 'react-router-dom'
import shopData from '../../../config/data/shop.js/shopData'

export const Shop = () => {
    const data = shopData
    return (
        <div className='shop_page'>

            <div className="shop_cards">

                <div className="card card--1">
                        
                    <div className="card__img"></div>
                    <Link to="/shop/waterpomps" className="card_link">
                        <div className="card__img--hover"></div>
                    </Link>
                    <div className="card__info">

                        <h3 className="card__title">WATERPOMP</h3>
                        {/* <span className="card__by">by <a href="#" className="card__author" title="author">John Doe</a></span> */}
                    </div>
                </div>


                <div className="card card--2">

                    <div className="card__img"></div>
                    <a href="/shop/systems" className="card_link">
                        <div className="card__img--hover"></div>
                    </a>
                    <div className="card__info">
                       
                        <h3 className="card__title">IRRIGATION SYSTEMS</h3>
                        {/* <span className="card__by">by <a href="#" className="card__author" title="author">John Doe</a></span> */}
                    </div>
                </div>


                <div className="card card--3">

                    <div className="card__img"></div>
                    <a href="/shop/parts" className="card_link">
                        <div className="card__img--hover"></div>
                    </a>
                    <div className="card__info">
                      
                        <h3 className="card__title">PARTS</h3>
                        {/* <span className="card__by">by <a href="#" className="card__author" title="author">Celeste Mills</a></span> */}
                    </div>
                </div>

            </div>
            <div className="shop_cards">

                <div className="card card--4">

                    <div className="card__img"></div>
                    <a href="/shop/machines" className="card_link">
                        <div className="card__img--hover"></div>
                    </a>
                    <div className="card__info">
                        
                        <h3 className="card__title">POWER MACHINES</h3>
                        {/* <span className="card__by">by <a href="#" className="card__author" title="author">Celeste Mills</a></span> */}
                    </div>
                </div>


                <div className="card card--5">

                    <div className="card__img"></div>
                    <a href="/shop/pipes" className="card_link">
                        <div className="card__img--hover"></div>
                    </a>
                    <div className="card__info">
                       
                        <h3 className="card__title">PIPES</h3>
                        {/* <span className="card__by">by <a href="#" className="card__author" title="author">John Doe</a></span> */}
                    </div>
                </div>
                <div className="card card--6">

                    <div className="card__img"></div>
                    <a href="/shop/tools" className="card_link">
                        <div className="card__img--hover"></div>
                    </a>
                    <div className="card__info">
                      
                        <h3 className="card__title">TOOLS</h3>
                        {/* <span className="card__by">by <a href="#" className="card__author" title="author">Celeste Mills</a></span> */}
                    </div>
                </div>

            </div>

        </div>

    )
}
