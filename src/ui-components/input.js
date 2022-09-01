import Error from "./error"
import { useContext, useEffect, useState } from "react";
import { inputValues } from "../contexts/input-values";
import { getData } from "../api/formdata";
import SelectDropdown from "./select-dropdown";
import Icon from "./icon";
import errorSvg from "../assets/images/error.svg"

export default function Input({ id, label, value, error, message, message_phone, handleChange, sub_type, data_url, radio_values, ...inputProps }) {
    const { setErrors, bulkValidation } = useContext(inputValues);
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

    const checkRadio = (inputProps.type === 'radio' && bulkValidation) && value === '';

    return (
        <>
            <div className={`input${ inputProps.type ? ` input-${sub_type || inputProps.type}` : '' }`}>
                { label && <label className={ checkRadio ? 'error-text' : ''}>{label} { checkRadio && <Icon render={errorSvg}/>}</label> }
                <div className="input-wrap" onClick={handleSelect}>
                    {
                        inputProps.type !== 'radio' &&
                        <input 
                            className = {inputProps.required && (focus || bulkValidation) && value === '' ? 'border-error' : ''} id = {id} {...inputProps} 
                            value = {value} onChange = {handleChange} onBlur={ e => {handleFocus(e); sub_type === 'date' && (e.target.type = "text")}} readOnly={sub_type === 'select' ? true : false}
                            onFocus={(e) => {sub_type === 'date' && (e.target.type = "date"); e.target.autocomplete = 'off'}} //"new-password";}}
                            // autoComplete="off"
                        />
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
                    { 
                        sub_type === 'select' &&
                        <SelectDropdown selected = {selected} render={
                            <ul>
                                {
                                    data ? data?.map(el => 
                                        <li key={el.id} id={el.id} onClick={()=>handleChange({target : {name: inputProps.name, value: el.id}})}>
                                            {el.name}
                                        </li>) 
                                    : '...loading'
                                }
                            </ul>
                        }/>
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