import Error from "./error"
import { useContext, useEffect, useState } from "react";
import { inputValues } from "../contexts/input-values";
import { getData } from "../api/formdata";

export default function Input({ id, label, value, error, message, message_phone, handleChange, sub_type, data_url, ...inputProps }) {
    const {setErrors} = useContext(inputValues);
    const [validation, setValidation] = useState({});
    const [focus, setFocus] = useState(false)
    const [data, setData] = useState([])


    useEffect(() => {
        if(data_url) {
            (async function() {
                const dataToFetch = await getData(data_url);
                setData(dataToFetch?.data)
            })()
        }
    },[])

    useEffect(() => {
        error?.pattern_1 ? setValidation({pattern_1: true, pattern : true}) : setValidation({pattern : true})
    },[])

    useEffect(() => {
        if(error?.pattern) handleError('pattern', value)
        if(error?.pattern_1) handleError('pattern_1', value)
    },[value])

    const handleError = (pattern, val) => {
        const bool = error[pattern].test(val)

        setValidation((curr)=> curr? {...curr, [pattern] : !bool} : {curr})
        if(bool) return setErrors(false)
        setErrors(true)
    }

    const handleFocus = () => {
        setFocus(true)
    }
    return (
        <>
            <div className={`input${ inputProps.type ? ` input-${sub_type || inputProps.type}` : '' }`}>
                { label && <label>{label}</label> }
                <input className = {inputProps.required && focus && value === '' ? 'border-error' : ''} id = {id} {...inputProps} value = {value} onChange = {handleChange} onBlur={handleFocus} readOnly={sub_type ? true : false}/>
                    {
                        data?.map(el => 
                            <li key={el.id} id={el.id} onClick={()=>handleChange({target : {name: inputProps.name, value: el.name}})}>
                               {el.name}
                            </li>)
                    }
                { ((error && focus) && ((validation.pattern || validation.pattern_1) && <Error error = { `${validation.pattern ? `${error?.message}` : ''}${validation.pattern && validation.pattern_1 ? ', ' : ''}${validation.pattern_1 ? `${error?.message_1}` : ''}` } />)) || (message && <span>{message}</span>) }
            </div>
        </>
    )
}