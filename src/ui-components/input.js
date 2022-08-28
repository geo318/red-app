import Error from "./error"
export default function Input({ id, label, value, error, message, message_phone, handleChange, sub_type, ...inputProps }) {

    const handleError = (pattern) => {
        if(error?.[pattern] == null || error?.[pattern] === '') return false
        
        console.log(error?.[pattern])
        return new RegExp(error?.[pattern]).test(value)
    }   

    console.log( handleError('pattern') , handleError('pattern_1'))

    return (
        <>
            <div className={`input${ inputProps.type ? ` input-${sub_type || inputProps.type}` : '' }`}>
                { label && <label>{label}</label> }
                <input id = {id} {...inputProps} value = {value} onChange = {handleChange} novalidate />
                { (error && ( handleError('pattern') || handleError('pattern_1') ) && <Error error = { `${handleError('pattern') ? `${ error.message}` : ''} ${handleError('pattern_1') ? `${error.message_1}` : '' }` } />) || (message && <span>{message}</span>) }
            </div>
        </>
    )
}