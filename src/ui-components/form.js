import { useContext, useMemo, useState } from "react";
import { inputValues } from "../contexts/input-values";
import { Link } from 'react-router-dom'
import { postData } from "../api/postdata";
import Success from "../pages/success";

export default function Form({render, link, text, values, isError, handleRoute, submit}) {
    const {errors, setBulkValidation, formData, fallback} = useContext(inputValues);
    const [loading, setLoading] = useState(true)
    const [popUp, setPopUp] = useState(false)
    const isErrorMemo = useMemo(()=> isError(),[isError])

    const handleSubmit = async () => {
        setBulkValidation(true)
        if(!submit) {
            handleRoute(link, isError())
            return
        }
        if(errors || isErrorMemo) return

        for ( const key in values ) {
            formData.append(key, values[key]);
        }

        const payload = formData
        const result = await sendValues(payload)
        if(result && !isError()) {
            setPopUp(true)
        }
        //handleRoute(link, true)
        
    }
    
    const sendValues = async (data) => {
        const res = await postData('https://pcfy.redberryinternship.ge/api/laptop/create', data)
        return res
        
    }

    const button = <button type='submit' onClick = {handleSubmit}>{text ? text : 'no text'}</button>;

    return (
        <form onSubmit={e => e.preventDefault()} onInvalid={e => e.preventDefault()}>
            {render}
            {   
                errors || !link ?
                button :
                <Link className="button-link" to={`/form/${link}`}>
                    {button}
                </Link>
            }
            {
                popUp && <Success/>
            }
        </form>
    )
}