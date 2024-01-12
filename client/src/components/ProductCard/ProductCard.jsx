import './ProductCard.css'
import React from 'react'

import { Link } from 'react-router-dom'
const img='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQ6e4SH44lHQDEQ-qqSftYapwdtTNYIOi4AA&usqp=CAU'

export const ProductCard = () => {
  return (
    <div className="product__card">
        <span className="product__price">20$</span>
        
            <img src={img} alt="" className="product__image" />
        
        <div className="size">
            <h1 className="product__title">Bosh </h1>
        </div>
        <Link className='buy__btn btn1'>
        <i className="fas fa-shopping-cart"></i>
        </Link>
        <Link to={`/shop/${'data.type'}/${'data._id'}/details`}
        className='details__btn btn1'>
        <i className="fas fa-info-circle"></i>
        </Link>
    </div>
  )
}
