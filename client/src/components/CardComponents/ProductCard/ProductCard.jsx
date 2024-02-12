import './productCard.css'
import React, { useEffect, useState } from 'react'

import { Link } from 'react-router-dom'
import { useAuthContext } from '../../../context/AuthContext'
import { useNotification } from '../../../context/NotificationContext'
import { useProductContext } from '../../../context/ProductContext'


export const ProductCard = (data) => {
  const { userId } = useAuthContext();
  const { onBuyProduct, onAddFavorite, onRemoveFavorite } = useProductContext();
  const dispatch = useNotification();

  const [isFavorit, setIsFavorit] = useState(false);
  const [isBuy, setIsBuy] = useState('productBuy');
  const [addClass, setAddClass] = useState('fa-regular');



  useEffect(() => {
    if (userId) {
      if (data.favorite.length > 0) {
        const result = data.favorite.filter(x => x._id === userId);
        if (result.length > 0) {
          setAddClass('fa-solid')
          setIsFavorit(true);
        }
      }

    }
  }, [userId]);

  const onChange = () => {
    if (userId) {
      if (isFavorit) {
        setIsFavorit(false);
        setAddClass('fa-regular')
        onRemoveFavorite(data.type, data._id, userId);
      } else if (!isFavorit) {
        setIsFavorit(true);
        setAddClass('fa-solid')
        onAddFavorite(data.type, data._id, userId);
      }
    } else {
      dispatch({
        type: 'ERROR',
        message: 'You must first login!',
      });
    }
  }
  const onBuy = () => {
    if (userId) {

      onBuyProduct(data.type, data._id, userId);
      setIsBuy('disabledBuyBtn')
    } else {
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
          className={`fa-heart fa-2x ${addClass}`}></i></span>

      <div className="cardImages">

        <img src={data.image} alt="" className="productImage" />
      </div>

      <div className="size">
        <h1 className="productTitle">{data.title}</h1>
      </div>
      <span onClick={onBuy}
        className={`productBtn ${isBuy}`} >
        <i className={`fas fa-shopping-cart `}></i>
      </span>
      <Link to={`/shop/${data.type}/${data._id}`}
        className='productBtn productDetails '>
        <i className="fas fa-info-circle"></i>
      </Link>
    </div>
  );
};

export default ProductCard;