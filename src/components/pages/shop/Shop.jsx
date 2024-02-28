import './shop.css';

import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { v4 } from 'uuid';
import shopData from '../../../config/data/shopData';


const Shop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return (
        <div className='shopPage'>
            {shopData.map(x =>
                <div key={v4()} className="shopDiv">
                    <div className={`shopCard shopCard--${x.position}`}>
                        <div className="shopCardImg"></div>
                        <Link to={`/shop/${x.type}`} >
                            <div className="shopCardImg--hover"></div>
                        </Link>
                        <div className="shopCardInfo">
                            <h3 className="shopCardTitle">{x.title}</h3>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};
export default Shop;