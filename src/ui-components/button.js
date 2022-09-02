import { Link } from "react-router-dom"

export default function Button({text, size, padding, onClick, className, type, render, link}) {
    const buttonStyle = {
        "padding": padding,
        "fontSize": size
    }
    const buttonIconStyle = {
        "padding":0,
        "border":0,
        "backgroundColor":"transparent"
    }

    const buttonJSX = 
        <div className={`flx pointer ${className ? className : '' }`}>
            <button className = 'button' type = {type} onClick={(e) => onClick(e)} style = {render ? buttonIconStyle : buttonStyle}>{ text ? text : render }</button>
        </div>;

    return (
        <>
            {
                link ? 
                <Link className="lnk" to={link}>
                    {buttonJSX}
                </Link> :
                buttonJSX
            }
        </>
    )
}