import { useContext, useMemo, useState } from "react";
import { inputValues } from "../contexts/input-values";
import { Link } from 'react-router-dom'
import { postData } from "../api/postdata";
import Success from "../pages/success";
import { apiUrl } from "../api/url-params";
import Button from "./button";
import "../assets/css/form.css"

export default function Form({render, link, text, values, isError, handleRoute, submit}) {
    const {errors, setBulkValidation, bulkValidation, formData, fallback} = useContext(inputValues);
    const [loading, setLoading] = useState(true)
    const [popUp, setPopUp] = useState(false)

    const handleSubmit = async () => {
        setBulkValidation(true)

        if(isError) return

        if(!submit) {
            handleRoute(link, isError)
            return
        }

        for ( const key in values ) {
            formData.append(key, values[key]);
        }

        const payload = formData
        const result = await sendValues(payload)
        if(result && !isError) {
            setPopUp(true)
        }        
    }
    
    const sendValues = async (data) => {
        const res = await postData(apiUrl + 'laptop/create', data)
        return res
    }

    const button = <Button padding='18px 46px' type='submit' text={text ? text : 'no text'} onClick = {handleSubmit} size='20px'/>

    return (
        <form className="form wrp" onSubmit={e => e.preventDefault()} onInvalid={e => e.preventDefault()}>
            <div className="form-content-wrap">
                <div className="form-content flx flx-wrap">
                    {render}
                </div>
                {   
                    !link || isError ?
                    <div className="form-button">{button}</div> :
                    <Link className="button-link form-button" to={`/form/${link}`}>
                        {button}
                    </Link>
                }
            </div>
            {
                popUp && <Success/>
            }
        </form>
    )
}