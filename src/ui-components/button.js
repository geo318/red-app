export default function Button({text, padding, onClick, className, type, render}) {
    const buttonStyle = {
        "display": "flex",
        "padding": padding,
    }
    const buttonIcon = {
        "padding":0,
        "border":0,
        "backgroundColor":"transparent"
    }

    return (
        <>
            <div className={`flx button ${className ? className : '' }`}>
                <button className = 'pointer' type = {type} onClick={(e) => onClick(e)} style = {render ? buttonIcon : buttonStyle}>{ text ? text : render }</button>
            </div>
        </>
    )
}