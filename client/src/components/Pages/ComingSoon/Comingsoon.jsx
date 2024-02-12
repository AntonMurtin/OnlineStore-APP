import './comingSoon.css'
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

import { errorImage } from '../../../config/data/servicesData';

const Comingsoon = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <section >
      <div className="comingSoon">
        <div className="comingSoonDiv">

          <img src={errorImage.comingSoon}/>
        </div>
      </div>
    </section >
   
  )
}

export default Comingsoon;