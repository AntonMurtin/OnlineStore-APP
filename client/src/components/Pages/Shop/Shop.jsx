import './shop.css'

import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'


const Shop = () => {
    const {pathname}=useLocation();

    useEffect(()=>{
       window.scrollTo(0,0);
    },[pathname]);

    return (
        <div className='shopPage'>
            <div className="shopDiv">
                <div className="shopCard shopCard--1">
                    <div className="shopCardImg"></div>
                    <Link to="/shop/waterpumps" >
                        <div className="shopCardImg--hover"></div>
                    </Link>
                    <div className="shopCardInfo">
                        <h3 className="shopCardTitle">WATERPOMP</h3>
                    </div>
                </div>


                <div className="shopCard shopCard--2">

                    <div className="shopCardImg"></div>
                    <Link to="/shop/irigationSystems" >
                        <div className="shopCardImg--hover"></div>
                    </Link>
                    <div className="shopCardInfo">

                        <h3 className="shopCardTitle">IRRIGATION SYSTEMS</h3>

                    </div>
                </div>


                <div className="shopCard shopCard--3">

                    <div className="shopCardImg"></div>
                    <Link to="/shop/parts" >
                        <div className="shopCardImg--hover"></div>
                    </Link>
                    <div className="shopCardInfo">

                        <h3 className="shopCardTitle">PARTS</h3>

                    </div>
                </div>

            </div>
            <div className="shopDiv">

                <div className="shopCard shopCard--4">

                    <div className="shopCardImg"></div>
                    <Link to="/shop/powerMachines" >
                        <div className="shopCardImg--hover"></div>
                    </Link>
                    <div className="shopCardInfo">

                        <h3 className="shopCardTitle">POWER MACHINES</h3>

                    </div>
                </div>


                <div className="shopCard shopCard--5">

                    <div className="shopCardImg"></div>
                    <Link to="/shop/pipes" >
                        <div className="shopCardImg--hover"></div>
                    </Link>
                    <div className="shopCardInfo">

                        <h3 className="shopCardTitle">PIPES</h3>

                    </div>
                </div>
                <div className="shopCard shopCard--6">

                    <div className="shopCardImg"></div>
                    <Link to="/shop/tools" >
                        <div className="shopCardImg--hover"></div>
                    </Link>
                    <div className="shopCardInfo">

                        <h3 className="shopCardTitle">TOOLS</h3>

                    </div>
                </div>

            </div>

        </div>

    );
};
export default Shop;