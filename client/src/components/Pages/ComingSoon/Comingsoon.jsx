import './ComingSoon.css'
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

const Comingsoon = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <section >
      <div className="comingSoon">
        <div className="comingSoonDiv">

          <img src="public/img/coming.jpg"/>
        </div>
      </div>
    </section >
   
  )
}

export default Comingsoon;