import '../register/forms.css';

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useForm } from '../../../hooks/useForm';
import { useProductContext } from '../../../context/ProductContext';
import { productServiceFactory } from '../../../sevices/productService';

import { Loading } from '../../cardComponents/loading/Loading';
import { initialValuesCreate, initialFocusCreate } from '../../../config/constants/create';
import {
    inputValidtion,
    errorMessage,
    productType,
    productName
} from '../../../config/constants/constants';

const EditProduct = () => {
    const productService = productServiceFactory();
    const { type, id } = useParams();
    const { onEditProduct } = useProductContext();
    const {
        values,
        focus,
        changeHandler,
        onSubmit,
        changeFocus,
        changeValues
    } = useForm(
        initialValuesCreate,
        initialFocusCreate,
        onEditProduct
    );
    const [loadingProduct, setLadingProduct] = useState(true);

    const getProduct = async () => {
       const result= await productService.getById(type,id);
       changeValues(result);
       setLadingProduct(false);
    }

    useEffect(() => {
        getProduct()
    }, [id])

    return (
        <div className='createPage'>
            {loadingProduct && (<Loading/>)}
            {!loadingProduct &&(

            
            <form method='POST' className="createForm" onSubmit={onSubmit}>
                <h3 className='createTop'> Edit Product</h3>

                <div className='formDiv'>

                    <select
                        required
                        onBlur={changeFocus}
                        focused={focus.type.toString()}
                        pattern={inputValidtion.type}
                        name="type"
                        value={values.type}
                        onChange={changeHandler}>
                        <option value=""  >Select your type</option>
                        <option value={productType.waterpumps}
                        >{productName.waterpumps}</option>
                        <option value={productType.irigationSystems}
                        >{productName.irigationSystems}</option>
                        <option value={productType.parts}
                        >{productName.parts}</option>
                        <option value={productType.powerMachines}
                        >{productName.powerMachines}</option>
                        <option value={productType.pipes}
                        >{productName.pipes}</option>
                        <option value={productType.tools}
                        >{productName.tools}</option>
                    </select>

                    <span>{errorMessage.type}</span>
                </div>


                <div className='formDiv'>

                    <input
                        required
                        onBlur={changeFocus}
                        focused={focus.title.toString()}
                        type="text"
                        name='title'
                        placeholder="Title"
                        value={values.title}
                        onChange={changeHandler}
                    />
                    <span>{errorMessage.title}</span>
                </div>

                <div className='formDiv'>

                    <input
                        required
                        onBlur={changeFocus}
                        focused={focus.image.toString()}
                        pattern={inputValidtion.image}
                        type="text"
                        name='image'
                        placeholder="Image"
                        id="image"
                        value={values.image}
                        onChange={changeHandler}
                    />
                    <span>{errorMessage.image}</span>
                </div>

                <div className='formDiv'>

                    <input
                        required
                        onBlur={changeFocus}
                        focused={focus.price.toString()}
                        type="number"
                        name='price'
                        min={1}
                        placeholder="Price"
                        id="price"
                        value={values.price}
                        onChange={changeHandler}
                    />
                    <span>{errorMessage.price}</span>
                </div>

                <div className='formDiv'>
                    <textarea
                        className='description'
                        required
                        onBlur={changeFocus}
                        focused={focus.description.toString()}
                        type="text"
                        name='description'
                        placeholder="Description "
                        id="description"
                        value={values.description}
                        onChange={changeHandler}
                    />
                    <span>{errorMessage.description}</span>
                </div>

                <button className='btn-log-reg'>Create</button>
            </form>
            )}
        </div>
    );
};

export default EditProduct;