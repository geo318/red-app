import { apiUrl } from "../api/url-params";
import { localStore } from "../helpers/local-storage";
import { useContext, useEffect, useState } from "react";
import { inputValues } from "../contexts/input-values";
import { getData } from "../api/formdata";
import Select from "./select/select-dropdown";
import Icon from "./icon";
import errorSvg from "../assets/images/error.svg"
import InputDate from "./input-date";
import Txt from "./text";
import Divider from "./divider";

export default function Input({ id, label, value, error, message, message_phone, handleChange, sub_type, data_url, radio_values, prop, filter, style, ...inputProps }) {
    const {values, bulkValidation, setBulkValidation} = useContext(inputValues);
    const [validation, setValidation] = useState({});
    const [focus, setFocus] = useState(false)
    const [data, setData] = useState([])

    useEffect(() => {
        if(data_url){
            const dataSelect = localStore(`${data_url}`)
            if(dataSelect) setData(dataSelect)
            if(data.length === 0) {
                (async function() {
                    const urlToFetch = apiUrl + data_url;   
                    const dataToFetch = await getData(urlToFetch);
                    setData(dataToFetch?.data)
                    localStore(`${data_url}`, dataToFetch?.data)
                })()
            }
        }
        error?.pattern_1 ? setValidation({pattern_1: true, pattern : true}) : setValidation({pattern : true})
    },[])

    useEffect(() => {
        if(filter && data.some(e => e[filter] !== values?.[filter]))
        handleChange({target : {name : inputProps.name, value : ''}})
    },[values?.[filter]])

    useEffect(() => {
        if(error && (error.pattern || error.pattern_1)) {
            if(error?.pattern_1) checkError('pattern_1', value)
            checkError('pattern', value)
            return
        }
        if(inputProps.required && inputProps.type !== 'radio') checkError('required', value)       
    },[value])

    const checkError = (pattern, val) => {
        const bool = pattern === 'required' ? /.+/.test(val) : error[pattern].test(val)
        if(pattern !== 'required') setValidation(curr=> curr? {...curr, [pattern] : !bool} : {curr})
        if(pattern === 'required') setValidation({notEmpty : !bool})
    }

    const handleFocus = () => {
        setFocus(true)
        setBulkValidation(false)
    }
    
    const conditionError = ((inputProps.required && inputProps.type !== 'radio') && (focus || bulkValidation) && (validation.pattern || validation.pattern_1 || validation.notEmpty))
    const checkRadio = (inputProps.type === 'radio' && value === '');
    const dropdownData = filter && data.length > 0 ? data.filter(e => values?.[filter] === e[filter]) : data;
    return (
        <>
            <div className={`input${ inputProps.type ? ` input-${sub_type || inputProps.type}` : '' }`} style={style||{'width':'100%'}} data-id={id}>
                { label && <><Txt size='18px' bold='600' lineHeight='21px' className={`${checkRadio ? 'error-text flx' : ''}${conditionError ? 'error-text' : ''}`} text={`${label}`} render={ checkRadio && <Icon width='22px' render={errorSvg}/>}/><Divider height='8px'/></> }
                <div className={`input-wrap${conditionError ? ' error-border' : ''}${` ${sub_type || inputProps.type}-wrap`}`}>
                    {
                        (inputProps.type !== 'radio' && sub_type !== 'date') &&
                        <input id = {id} {...inputProps} value = {value} onChange = {handleChange}
                            className = {inputProps.required && (focus || bulkValidation) && value === '' ? 'error-border' : ''}
                            onBlur={ e => {handleFocus(e);}}
                            style = {sub_type === 'select' ? {'display':'none'}:{}}
                        />
                    }
                    {
                        sub_type === 'date' && <InputDate name = {inputProps.name} id = {id} value = {value} handleChange = {handleChange} placeholder = {inputProps.placeholder}/>
                    }              
                    {   
                        sub_type === 'select' &&
                        <Select id = {id} className = {inputProps.required && (focus || bulkValidation) && value === '' ? 'pointer error-border' : 'pointer'} placeholder={inputProps.placeholder} value = {(value && data?.filter(e => e.id === value)?.[0]?.name) || value}>
                            <ul>
                                {
                                    data ? dropdownData.map(el => 
                                        <li key={el.id} id={el.id} className='pointer' onClick={()=> handleChange({target : {name: inputProps.name, value: el[prop] || el.id}})}>
                                            {el.name}
                                        </li>) 
                                    : '...loading'
                                }
                            </ul>
                        </Select>
                    }
                    {
                        inputProps.type === 'radio' &&
                        radio_values.map((e,i) =>
                            <div key={i}>
                                <Divider width='60px'/>
                                <input id={e.value} {...inputProps} value = {e.value} onChange={handleChange} checked={value === e.value ? true : false}/>
                                <label htmlFor={e.value}>{e.name}</label>
                            </div>
                        )
                    }
                </div>
                {
                    message && <Divider height='8px'/>
                }
                {
                    (conditionError && inputProps.type !== 'radio' && sub_type !== 'date' &&
                    <Txt size='14px' lineHeight='21px' color='#e52f2f' error = { `${(validation.pattern && `${error?.message || message}`) || message || ''}${validation.pattern && validation.pattern_1 ? ', ' : ''}${validation.pattern_1 ? `${error?.message_1}` : ''}` } />) || 
                    (message && <Txt size='14px' lineHeight='21px' bold='300' color='#2e2e2e' text= {message}/>) 
                }
            </div>
        </>
    )
}