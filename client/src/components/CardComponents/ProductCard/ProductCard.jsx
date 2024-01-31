import './ProductCard.css'
import React, { useEffect, useState } from 'react'

import { Link } from 'react-router-dom'
import { useAuthContext } from '../../../context/AuthContext'
// import { useFavoriteContext } from '../../../context/FavoriteContext'
import { useNotification } from '../../../context/NotificationContext'
import { useProductContext } from '../../../context/ProductContext'


export const ProductCard = (data) => {
  const { userId } = useAuthContext();
  const { onBuyProduct, onAddFavorite, onRemoveFavorite } = useProductContext();
  const dispatch = useNotification();

  const [isFavorit, setIsFavorit] = useState(false);
  const [isBuy, setIsBuy] = useState('productBuy');
  const [addclass, setAddClass] = useState('fa-regular');



  useEffect(() => {
    if (userId) {
      if (data.favorite.length > 0) {
        const result = data.favorite.filter(x => x._id === userId);
        if (result.length > 0) {
          setIsFavorit(true);
          setAddClass('fa-solid')
        }
      }
    }
  }, [userId]);

  const onChange = () => {
    if (userId) {
      if (isFavorit) {
        onRemoveFavorite(data.type, data._id, userId);
        setIsFavorit(false);
        setAddClass('fa-regular')
      } else if (!isFavorit) {
        onAddFavorite(data.type, data._id, userId);
        setIsFavorit(true);
        setAddClass('fa-solid')
      }
    } else {
      dispatch({
        type: 'ERROR',
        message: 'You must first login!',
      });
    }
  }
  const onBuy = () => {
    if(userId){

      setIsBuy('disabledBuyBtn')
      onBuyProduct(data.type, data._id, userId);
    }else {
      dispatch({
        type: 'ERROR',
        message: 'You must first login!',
      });
    }
  }

  return (
    <div className="productCard">
      <span className="productPrice">{data.price} $</span>
      <span
        onClick={onChange}
        className="productFavorite">
        <i
          className={`fa-heart fa-2x
      ${addclass} `}></i></span>

      <div className="cardImages">

        <img src={data.image} alt="" className="productImage" />
      </div>

      <div className="size">
        <h1 className="productTitle">{data.title}</h1>
      </div>
      <Link onClick={onBuy}
        className={`productBtn ${isBuy}`} >
        <i className={`fas fa-shopping-cart `}></i>
      </Link>
      <Link to={`/shop/${data.type}/${data._id}`}
        className='productBtn productDetails '>
        <i className="fas fa-info-circle"></i>
      </Link>
    </div>
  )
}
