import Error from "./error"
export default function Input({ id, label, value, error, message, message_phone, handleChange, sub_type, ...inputProps }) {

    const handleError = () => {
        return new RegExp(error?.pattern).test(value)
    }

    

    return (
        <>
            <div className={`input${ inputProps.type ? ` input-${sub_type || inputProps.type}` : '' }`}>
                { label && <label>{label}</label> }
                <input id = {id} {...inputProps} value = {value} onChange = {handleChange} />
                { (error && handleError() && <Error error = {error}/>) || (message && <div>{message}</div>) }
            </div>
        </>
    )
}