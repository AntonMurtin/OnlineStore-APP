import { useLocation } from 'react-router-dom';
import './ComingSoon.css'
import { useEffect } from 'react';

const Comingsoon = () => {
    const {pathname}=useLocation();

    useEffect(()=>{
       window.scrollTo(0,0);
    },[pathname]);

  return (
    <div className="comingSoon">
        <div className="comingSoonDiv">
            
               <img src="public/comingSoon_img/comingSoon.jpg" alt="" />
        </div>
    </div>

  )
}

export default Comingsoon;