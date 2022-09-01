import { useContext, useMemo } from "react";
import { inputValues } from "../contexts/input-values";
import { Link } from 'react-router-dom'
import { postData } from "../api/postdata";

export default function Form({render, link, text, values, isError, handleRoute, submit}) {
    const {errors, setBulkValidation} = useContext(inputValues);
    const isErrorMemo = useMemo(()=> isError(),[isError])
    const handleSubmit = () => {
        setBulkValidation(true)
        link === 'laptop' ? handleRoute('coworker',isError()) : handleRoute('laptop',isError())
        if(errors || isErrorMemo) return
        if(submit) {
           const x = sendValues()
           console.log(x)
        }
    }
    
    const sendValues = async () => {
        const res = await postData('https://pcfy.redberryinternship.ge/api/laptop/create', values)
        return res
    }

    const button = <button type='submit' onClick = {handleSubmit}>{text ? text : 'no text'}</button>;

    return (
        <form onSubmit={e => e.preventDefault()} onInvalid={e => e.preventDefault()}>
            {render}
            {   
                errors ?
                button :
                <Link className="button-link" to={`/form/${link}`}>
                    {button}
                </Link>
            }
            
        </form>
    )
}