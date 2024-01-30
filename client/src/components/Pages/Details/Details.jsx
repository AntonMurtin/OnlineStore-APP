import React, { useEffect, useState } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'

import { productServiceFactory } from '../../../sevices/productService'
import { DetailsCard } from '../../CardComponents/DetailsCard/DetailsCard'
import { Slider } from '../../SwiperComponents/Slider/Slider'
import { useProductContext } from '../../../context/ProductContext'
import { productName } from '../../../config/constants/constants'

const Details = () => {
    const { pathname } = useLocation();
    
    const { productType, productId } = useParams()
   
    const productService = productServiceFactory();

    const { onDeleteProduct } = useProductContext()


    const [product, setProduct] = useState([]);
    const [products, setProducts] = useState([]);
    
    const allProducts = products.filter(x => x._id !== productId);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);



    useEffect(() => {
        Promise.all([
            productService.getById(productType, productId),
            productService.getAll(productType),
        ]).then(([
            productData,
            productsData,
        ]) => {
            setProduct(productData)
            setProducts(productsData)
        })
    }, [productId])


    return (
        <section className='page'>

            <DetailsCard key={product._id}
                product={product}
                onDelete={onDeleteProduct} />

            <div className='productContent'>
                <h2>{productName[productType]}</h2>
                {<Slider data={allProducts} />}
                <Link className='goTo' to={`/shop/${product.type}`}>See all</Link>
            </div>
        </section>












        // <section className='page'>
        //   <div className="detailsPage">

        //     <div className="productDetails">
        //     <span className="detailsPrice">{product.price} $</span>

        //       <h1 className="detailsTitle">{product.title}</h1>

        //       <div className='detailsDescription'>
        //         <p> {product.description}</p>
        //       </div>
        //       <div className='quantuty'>
        //         <label htmlFor="price">Quantity</label>
        //                 <input className="search-input searchbar-input"
        //                     type="number"
        //                     name='quantity'
        //                     placeholder="1"
        //                     id="quantity"
        //                     onChange={handleChange}
        //                     value={quantity}

        //                 />
        //       </div>
        //       {isAuthenticated && !isAdmin && (
        //         <>

        //           <Link className="buy_details btn1 " onClick={() => { onBuy(type, productId, userId) }}>Buy Now</Link>
        //           <Link className="wish_details btn1" onClick={() => { onWish(type, productId, userId) }} >Favorit</Link >
        //         </>
        //       )}
        //       {isAdmin && (
        //         <>
        //           <Link to={`/shop/${type}/${productId}/edit`} className="buy_details btn1"> Edit </Link>
        //           <Link to={`/shop/${type}/${productId}/delete`} className="wish_details btn1" >Delete</Link>
        //         </>
        //       )}

        //     </div>

        //     <div className="detailsImage">


        //       <img src={product.image} alt={product.type} />


        //     </div>

        //   </div>
        //   <div className='details-card'>

        //     {products.map(x =>
        //       <ProductCard key={x._id} {...x} />)}
        //   </div >
        // </section>

    )
}

export default Details