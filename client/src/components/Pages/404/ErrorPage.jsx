import './errorPage.css'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom';

import { errorImage } from '../../../config/data/servicesData';

const ErrorPage = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return (
        <section >
            <div className="errorPage">
                <div className="errorDiv">
                    <h1 className="errorTitle">Sorry, this page is not available! </h1>
                </div>
                <img src={errorImage.error} />
                <img src={errorImage.error} />
                <img src={errorImage.error} />
                
            </div>

        </section >
    )
}

export default ErrorPage;