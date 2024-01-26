import React from 'react';
import './DetailsCard.css';

import { Link } from 'react-router-dom'
import { useState } from 'react';


export const DetailsCard = ({
    product,
    isAuthenticated,
    isAdmin,
    onDelete
}) => {
    const [imgClass, setImgClass] = useState('slideImg');
    const [deleteProduct, setDeleteProduct] = useState(false);


    const onClose = () => {
        setDeleteProduct(false)
    }


    return (
        <div className="details detailsFlex ">

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

                <div className="detailsBtnDiv">

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
                            <Link to={`/shop/${product.type}/${product._id}/edit`} 
                            className={`detailsBtn detailsEdit ${deleteProduct ? 'disabledBtn' : ''}`}>
                                <i className="fa-regular fa-pen-to-square"></i>
                            </Link>
                            <Link 
                                onClick={() => setDeleteProduct(true)}
                                className={`detailsBtn  detailsDelete ${deleteProduct ? 'disabledBtn' : ''}`} >
                                <i className="fa-regular fa-trash-can"></i></Link>
                        </>
                    )}
                </div>

            </div>
           
             <div className={`removeWrapper ${deleteProduct? '': 'removeNone'}`}>
            <div className='removeDiv'>
                <h3>You want to delete it!</h3>
                <div >
                    <span onClick={()=>onDelete(product.type,product._id)}
                    className="removeBtn"><i className="fa-solid fa-check fa-lg "></i></span>
                    <span 
                    onClick={onClose} 
                    className="closeRemove"><i className="fa-solid fa-xmark fa-lg "></i></span>
                </div>

            </div>
        </div>
        </div>
    );
};
