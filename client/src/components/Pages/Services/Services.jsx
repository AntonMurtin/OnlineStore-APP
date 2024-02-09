import './Services.css';
import { useEffect, lazy, Suspense } from 'react';
import { useLocation, useParams } from 'react-router-dom';

import { v4 } from 'uuid';

import { servicesData, chooseUs } from '../../../config/data/servicesData';

const Carousel = lazy(() => import('../../SwiperComponents/Carousel/Carousel'));

const Services = () => {
    const data = servicesData;
    const { type } = useParams();

    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);


    return (
        <section className='page'>

            <div className="services servicesFlex">
                <div className="servicesLeft">
                    <Suspense fallback={<h1 style={{ textAlign: 'center' }}>Loading...</h1>}>
                        {<Carousel data={data[type].image} />}
                    </Suspense>
                </div>

                <div className="servicesRight">
                    <div className="servicesImage">
                        <h3 className="servicesH3">{data[type].title}</h3>
                        <p className="servicesDescription">{data[type].description}</p>
                        <h3 className="servicesH3">Why Choose Us</h3>
                        <p className="servicesDescription">{chooseUs.title}</p>
                        {chooseUs.reasons.map(x =>
                            <h4 className="servicesH4" key={v4()}> <span className="reasons"><i className="fas fa-check"></i></span>{x}</h4>
                        )}

                    </div>
                </div>
            </div>
        </section>
    );
};

export default Services;