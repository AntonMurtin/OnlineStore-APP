import { useState } from "react"


export const useForm=(initialValues, initialFocus, onSubmitHandler)=>{
    const [values,setValues]=useState(initialValues);
     const [focus,setFocus]=useState(initialFocus);
    const changeFocus=(e)=>{
        setFocus(state=>({...state, [e.target.name]:true}))
    }

   const changeHandler=(e)=>{
        setValues(state=>({...state, [e.target.name]:e.target.value}))
    }

    const onSubmit=(e)=>{
        e.preventDefault();
        onSubmitHandler(values);
        // setValues(initialValues);
    }

    const changeValue=(newValue)=>{
        setValues(newValue);
    }

    return{
        values,
        focus,
        changeHandler,
        changeValue,
        onSubmit,
        changeFocus
    }
}