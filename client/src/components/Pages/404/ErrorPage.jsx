import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import './ErrorPage.css'

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
                <img src='public/img/404.jpg' />
                <img src='public/img/404.jpg' />
                <img src='public/img/404.jpg' />
            </div>

        </section >
    )
}

export default ErrorPage;