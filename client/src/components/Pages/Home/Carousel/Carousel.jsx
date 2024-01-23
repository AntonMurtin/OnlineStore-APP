import './Carousel.css'

import React, { useEffect, useState } from 'react';


function Carousel({ data }) {
    const [current, setCurrent] = useState(0);
    const [autoPlay, setAutoPlay] = useState(true);
    let timeOut = null;

    useEffect(() => {
        timeOut =
            autoPlay &&
            setTimeout(() => {
                slideRight();
            }, 2500);
    });

    const slideRight = () => {
        setCurrent(current === data.length - 1 ? 0 : current + 1);
    };

    const slideLeft = () => {
        setCurrent(current === 0 ? data.length - 1 : current - 1);
    };

    return (
        <div
            className="carousel"
            onMouseEnter={() => {
                setAutoPlay(false);
                clearTimeout(timeOut);
            }}
            onMouseLeave={() => {
                setAutoPlay(true);
            }}
        >
            <div className="carouselWrapper">
                {data.map((image, index) => {
                    return (

                        <div
                            key={index}
                            className={
                                index == current
                                    ? "carouselCard carouselCard-active"
                                    : "carouselCard"
                            }
                        >
                            <img className="carouselImage" src={image.image} alt={image.title}/>
                            <div className="carouselOverlay">
                                <h2 className="carouselTitle">{image.title}</h2>
                            </div>
                        </div>
                    );
                })}
                <div className="carousel_arrow_left" onClick={slideLeft}>
                    &lsaquo;
                </div>
                <div className="carousel_arrow_right" onClick={slideRight}>
                    &rsaquo;
                </div>
                <div className="carouselPagination">
                    {data.map((_, index) => {
                        return (
                            <div
                                key={index}
                                className={
                                    index == current
                                        ? "pagination_dot pagination_dot-active"
                                        : "pagination_dot"
                                }
                                onClick={() => setCurrent(index)}
                            ></div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default Carousel