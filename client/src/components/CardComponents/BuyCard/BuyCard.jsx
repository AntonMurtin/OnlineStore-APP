import React from 'react'
import './BuyCard.css'

export const BuyCard = (product) => {
    return (
        <div className="buyDiv">
            <div className='buyCard'>
                <div className='optionDiv'>
                <img src={product.image} alt={product.title} />
                </div>
                <div className='buyCardDetails'>
                    <p>{product.title}</p>

                    <div className="qty" data-phino="Qty">
                        <button type="button"
                            className="btn btn-qty qty-minus"
                            onClick={() => changeQty(id, 'dec')}
                        ><i className="fas fa-minus"></i></button>
                        <span className="qty-value">{product.quantity}</span>
                        <button type="button"
                            className="btn btn-qty qty-plus"
                            onClick={() => changeQty(id, 'inc')}
                        ><i className="fas fa-plus"></i></button>
                    </div>
                    <div className="buyPrice">
                        <span className='price'>Price:1511 ${Number(product.price) * product.quantity}</span>
                    </div>


                </div>
                <div className='cancel' onClick={() => onRemove(product.type, product._id, userId)} ><i className="fas fa-window-close"></i></div>
            </div>
        </div>
    )
}
