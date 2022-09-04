import { useContext, useMemo, useState } from "react";
import { inputValues } from "../contexts/input-values";
import { Link } from 'react-router-dom'
import { postData } from "../api/postdata";
import Success from "../pages/success";
import { apiUrl } from "../api/url-params";
import Button from "./button";
import "../assets/css/form.css"
import Txt from "./text";
import Divider from "./divider";
import { initialValues } from "../pages/dataSet/input-data";

export default function Form({render, link, backLink, text, values, setValues, isError, handleRoute, submit}) {
    const {setBulkValidation, formData} = useContext(inputValues);
    const [popUp, setPopUp] = useState(false)

    const handleSubmit = async () => {
        setBulkValidation(true)

        if(isError) return

        if(!submit) {
            handleRoute(link, isError)
            return
        }

        for (const key in values) {
            formData.append(key, values[key]);
        }

        const payload = formData
        const result = await sendValues(payload)
        if(result && !isError) {
            setPopUp(true)
            setValues(initialValues)
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
                <div className="flx flx-mid flx-vc">
                    {
                        backLink && <Txt color='#62a1eb' text = 'უკან' link={backLink}/>
                    }
                    {   
                        !link || isError ?
                        <div className="form-button">{button}</div> :
                        <Link className="button-link form-button" to={`/form/${link}`}>
                            {button}
                        </Link>
                    }
                </div>
                <Divider height='45px'/>
            </div>
            {
                popUp && <Success/>
            }
        </form>
    )
}