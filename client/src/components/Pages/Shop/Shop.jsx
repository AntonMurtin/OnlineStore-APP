import './Shop.css'

import React from 'react'
import { Link } from 'react-router-dom'


export const Shop = () => {
    
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

                    </div>
                </div>


                <div className="card card--2">

                    <div className="card__img"></div>
                    <Link to="/shop/irigationSystems" className="card_link">
                        <div className="card__img--hover"></div>
                    </Link>
                    <div className="card__info">

                        <h3 className="card__title">IRRIGATION SYSTEMS</h3>

                    </div>
                </div>


                <div className="card card--3">

                    <div className="card__img"></div>
                    <Link to="/shop/parts" className="card_link">
                        <div className="card__img--hover"></div>
                    </Link>
                    <div className="card__info">

                        <h3 className="card__title">PARTS</h3>

                    </div>
                </div>

            </div>
            <div className="shop_cards">

                <div className="card card--4">

                    <div className="card__img"></div>
                    <Link to="/shop/machines" className="card_link">
                        <div className="card__img--hover"></div>
                    </Link>
                    <div className="card__info">

                        <h3 className="card__title">POWER MACHINES</h3>

                    </div>
                </div>


                <div className="card card--5">

                    <div className="card__img"></div>
                    <Link to="/shop/pipes" className="card_link">
                        <div className="card__img--hover"></div>
                    </Link>
                    <div className="card__info">

                        <h3 className="card__title">PIPES</h3>

                    </div>
                </div>
                <div className="card card--6">

                    <div className="card__img"></div>
                    <Link to="/shop/tools" className="card_link">
                        <div className="card__img--hover"></div>
                    </Link>
                    <div className="card__info">

                        <h3 className="card__title">TOOLS</h3>

                    </div>
                </div>

            </div>

        </div>

    )
}
