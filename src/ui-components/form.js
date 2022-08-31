import { useContext } from "react";
import { inputValues } from "../contexts/input-values";
import { Link } from 'react-router-dom'

export default function Form({render,link,text}) {
    const {errors, setBulkValidation} = useContext(inputValues);
    
    const handleSubmit = (e) => {
        e.preventDefault();
        if(errors) return
        const data = new FormData(e.target) 
        console.log(Object.fromEntries(data))
    }

    const handleBlur = () => {
        setBulkValidation(true)
    }

    const button = <button type='submit' onClick = {handleBlur}>{text ? text : 'no text'}</button>;

    return (
        <form onSubmit={handleSubmit} onInvalid={e => e.preventDefault()}>
            {render}
            {   
                errors ?
                button :
                <Link to='/form/laptop'>
                    {button}
                </Link>
            }
            
        </form>
    )
}