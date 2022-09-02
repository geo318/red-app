import Error from "./error"
import { useContext, useEffect, useState } from "react";
import { inputValues } from "../contexts/input-values";
import { getData } from "../api/formdata";
import SelectDropdown from "./select-dropdown";
import Icon from "./icon";
import errorSvg from "../assets/images/error.svg"
import InputDate from "./input-date";

export default function Input({ id, label, value, error, message, message_phone, handleChange, sub_type, data_url, radio_values, prop, filter, ...inputProps }) {
    const {values, setErrors, bulkValidation } = useContext(inputValues);
    const [validation, setValidation] = useState({});
    const [focus, setFocus] = useState(false)
    const [data, setData] = useState([])
    const [selected, setSelected] = useState(false)

    const handleSelect = () => {
        if(sub_type !== 'select') return
        setSelected(e => !e)
    }

    useEffect(() => {
        if(data_url) {
            (async function() {
                const dataToFetch = await getData(data_url);
                filter ? setData(dataToFetch?.data.filter(e => values?.[filter] === e[filter])) : setData(dataToFetch?.data)

                if(filter && data.some(e => e[filter] !== values?.[filter])) {
                    handleChange({target : {name : inputProps.name, value : ''}})
                }
            })()
        }
    },[values?.[filter]])

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

    const checkRadio = (inputProps.type === 'radio' && bulkValidation) && value === '';

    return (
        <>
            <div className={`input${ inputProps.type ? ` input-${sub_type || inputProps.type}` : '' }`}>
                { label && <label className={ checkRadio ? 'error-text' : ''}>{label} { checkRadio && <Icon render={errorSvg}/>}</label> }
                <div className="input-wrap" onClick={handleSelect}>
                    {
                        (inputProps.type !== 'radio' && sub_type !== 'date') &&
                        <input id = {id} {...inputProps} value = {value} onChange = {handleChange}
                            className = {inputProps.required && (focus || bulkValidation) && value === '' ? 'border-error' : ''}
                            onBlur={ e => {handleFocus(e);}}
                            style = {sub_type === 'select' ? {'display':'none'}:{}}
                        />
                    }
                    {
                        sub_type === 'date' && <InputDate id = {id} value = {value} handleChange = {handleChange} placeholder = {inputProps.placeholder}/>
                    }
                    {
                        sub_type === 'select' && <input placeholder={inputProps.placeholder} value = {(value && data?.filter(e => e.id === value)?.[0]?.name) || value} readOnly/>
                    }                  
                    {   
                        
                        sub_type === 'select' &&
                        <SelectDropdown selected = {selected} render={
                            <ul>
                                {
                                    data ? data?.map(el => 
                                        <li key={el.id} id={el.id} onClick={()=> handleChange({target : {name: inputProps.name, value: el[prop] || el.id}})}>
                                            {el.name}
                                        </li>) 
                                    : '...loading'
                                }
                            </ul>
                        }/>
                    }
                    {
                        inputProps.type === 'radio' &&
                        radio_values.map((e,i) =>
                            <div key={i}>
                                <label htmlFor={e}>{e.name}</label> 
                                <input id={e.value} {...inputProps} value = {e.value} onChange={handleChange} checked={value === e.value ? true : false}/>
                            </div>
                        )
                    }
                </div>
                {
                    ((error && 
                    (focus || bulkValidation)) && 
                    ((validation.pattern || validation.pattern_1) && 
                    <Error error = { `${validation.pattern ? `${error?.message}` : ''}${validation.pattern && validation.pattern_1 ? ', ' : ''}${validation.pattern_1 ? `${error?.message_1}` : ''}` } />)) || 
                    
                    (message && <span>{message}</span>) 
                }
            </div>
        </>
    )
}