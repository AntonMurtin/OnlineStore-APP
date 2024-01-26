import './ProductCard.css'
import React, { useState } from 'react'

import { Link } from 'react-router-dom'


export const ProductCard = (data) => {
const [isFavorit,setIsFavorit]=useState("fa-solid")

const onFavorit=()=>{
  if(isFavorit==='fa-regular'){
    setIsFavorit('fa-solid')
  }else{
    setIsFavorit('fa-regular')
  }
}

  return (
    <div className="productCard">
      <span className="productPrice">{data.price} $</span>
      <span onAuxClick={onFavorit} className="productFavorit"><i className={`fa-heart fa-2x
      ${isFavorit } `}></i></span>

      <div className="cardImages">

        <img src={data.image} alt="" className="productImage" />
      </div>

      <div className="size">
        <h1 className="productTitle">{data.title}</h1>
      </div>
      <Link className='productBtn productBuy '>
        <i className="fas fa-shopping-cart"></i>
      </Link>
      <Link to={`/shop/${data.type}/${data._id}`}
        className='productBtn productDetails '>
        <i className="fas fa-info-circle"></i>
      </Link>
    </div>
  )
}
