import Error from "./error"
export default function Input({ id, label, value, error, message, message_phone, handleChange, sub_type, ...inputProps }) {

    const handleError = () => {
        error.pattern
    }

    return (
        <>
            <div className={`input${ inputProps.type ? ` input-${sub_type || inputProps.type}` : '' }`}>
                { label && <label>{label}</label> }
                <input id = {id} {...inputProps} value = {value} onChange = {handleChange} pattern = {inputProps.pattern} />
                { (error && <Error error = {error}/>) || (message && <div>{message}</div>) }
                {/* <span>{inputProps.errorMessage}</span> */}
            </div>
        </>
    )
}