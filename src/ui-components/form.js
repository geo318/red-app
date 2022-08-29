import { useContext } from "react";
import { inputValues } from "../contexts/input-values";

export default function Form({render}) {
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

    return (
        <form onSubmit={handleSubmit} onInvalid={e => e.preventDefault()}>
            {render}
            <button onClick = {handleBlur}>submit</button>
        </form>
    )
}