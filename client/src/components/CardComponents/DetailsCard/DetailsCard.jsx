import React from 'react';
import './DetailsCard.css';

import { Link } from 'react-router-dom'
import { useState } from 'react';

export const DetailsCard = ({
    product,
    isAuthenticated,
    isAdmin
}) => {
    const [imgClass, setImgClass] = useState('slideImg')

    return (
        <div className="details detailsFlex">

            <div className="detailsLeft">
                <div className="detailsImage">
                    <img src={product.image} className={`slideImg ${imgClass}`} />
                </div>
                <div className="option detailsFlex">
                    <img src={product.image} className='slideImg0' onClick={() => setImgClass('slideImg0')} />
                    <img src={product.image} className='slideImg1' onClick={() => setImgClass('slideImg1')} />
                    <img src={product.image} className='slideImg2' onClick={() => setImgClass('slideImg2')} />
                    <img src={product.image} className='slideImg3' onClick={() => setImgClass('slideImg3')} />
                    <img src={product.image} className='slideImg4' onClick={() => setImgClass('slideImg4')} />

                </div>
            </div>

            <div className="detailsRight">
                <h3 className='detailsH3' >{product.title}</h3>
                <h4 className='detailsH4' >{`Price: ${product.price} $`}</h4>
                <p className='detailsP' >{product.description}</p>

                <div className="detailsBtn">

                    {isAuthenticated && !isAdmin && (
                        <>
                            <Link className="detailsBtn detailsBuybtn "
                                onClick={() => { onBuy(product.type, product._id, userId) }}>
                                <i className="fas fa-shopping-cart"></i>
                            </Link>
                            <Link className="detailsBtn detailsFavBtn"
                                onClick={() => { onWish(product.type, product._id, userId) }} >
                                <i className="fa-solid fa-heart "></i>
                            </Link >
                        </>
                    )}
                    {isAdmin && (
                        <>
                            <Link to={`/shop/${product.type}/${product._id}/edit`} className="detailsBtn editBtn"> Edit </Link>
                            <Link to={`/shop/${product.type}/${product._id}/delete`} className="detailsBtn  deleteBtn" >Delete</Link>
                        </>
                    )}
                </div>
                
            </div>
        </div>
    );
};
