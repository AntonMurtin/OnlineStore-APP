import './buyCard.css'

import { useProductContext } from '../../../context/ProductContext'
import { useAuthContext } from '../../../context/AuthContext';

const BuyCard = (product) => {

    const { onRemoveBuy ,changeQty} = useProductContext();
    const {userId}=useAuthContext()
    return (
        <div className="buyDiv">
            <div className='buyCard'>
                <div className='optionDiv'>
                    <img src={product.image} alt={product.title} />
                </div>

                <div className='buyCardDetails'>
                    <p className='buyDetails'>{product.title}</p>

                    <div className="qty" data-phino="Qty">
                        <button type="button"
                            className="btn btn-qty qty-minus"
                            onClick={() => changeQty(product._id, 'dec')}
                        ><i className="fas fa-minus"></i></button>
                        <span className="qty-value">{product.quantity}</span>
                        <button type="button"
                            className="btn btn-qty qty-plus"
                            onClick={() => changeQty(product._id, 'inc')}
                        ><i className="fas fa-plus"></i></button>
                    </div>

                    <div className="buyPrice">
                        <span className='buyPriceSpan'>Price: {Number(product.price) * product.quantity}$</span>
                    </div>

                </div>
                <div className='removeBuy' onClick={() => onRemoveBuy(product.type, product._id, userId)} ><i className="fas fa-window-close"></i></div>
            </div>
        </div>
    );
};

export default BuyCard;