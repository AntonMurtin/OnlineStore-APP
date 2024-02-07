import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import './ErrorPage.css'

const ErrorPage = () => {
    const {pathname}=useLocation();

    useEffect(()=>{
       window.scrollTo(0,0);
    },[pathname]);

    return (
        <section >
            <div className="errorPage">
                <div className="errorDiv">
                    <h1 className="errorTitle">Sorry, this page is not available! </h1>
                 
                </div>
                <img src='https://media.istockphoto.com/id/519106909/photo/white-3d-man-with-red-404-error-symbol.jpg?s=612x612&w=0&k=20&c=yudQWT4Dw3-t0ekfZxVrAY7p-vGOkuZ6plyhoDvc82Y=' />
                <img src='https://media.istockphoto.com/id/519106909/photo/white-3d-man-with-red-404-error-symbol.jpg?s=612x612&w=0&k=20&c=yudQWT4Dw3-t0ekfZxVrAY7p-vGOkuZ6plyhoDvc82Y=' />
                <img src='https://media.istockphoto.com/id/519106909/photo/white-3d-man-with-red-404-error-symbol.jpg?s=612x612&w=0&k=20&c=yudQWT4Dw3-t0ekfZxVrAY7p-vGOkuZ6plyhoDvc82Y=' />
               
            </div>

        </section >
    )
}

export default ErrorPage;