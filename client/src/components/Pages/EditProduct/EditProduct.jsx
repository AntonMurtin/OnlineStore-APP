import '../Register/Forms.css';

import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useForm } from '../../../hooks/useForm';

import { useProductContext } from '../../../context/ProductContext';
import { productServiceFactory } from '../../../sevices/productService';

import { initialValuesCreate, initialFocusCreate } from '../../../config/constants/create';
import { inputValidtion, errorMessage } from '../../../config/constants/constants';

const EditProduct = () => {
const {type,id}=useParams();
const {onEditProduct}=useProductContext();

const productService=productServiceFactory();
    const {
        values,
        focus,
        changeHandler,
        onSubmit,
        changeFocus,
        changeValues
    }=useForm(
        initialValuesCreate,
        initialFocusCreate,
        onEditProduct
    );

    useEffect(() => {
        productService.getById(type, id)
            .then(result => {
                changeValues(result)
            })
    }, [id]);

  return (
    <div className='createPage'>
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
                        <option value="waterpomps">WATERPOMPS</option>
                        <option value="systems">IRRIGATION SYSTEMS</option>
                        <option value="parts">PARTS</option>
                        <option value="machines">POWER MACHINES</option>
                        <option value="pipes">PIPES</option>
                        <option value="tools">TOOLS</option>
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
                        pattern={inputValidtion.description}
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
        </div>
  );
};

export default EditProduct;