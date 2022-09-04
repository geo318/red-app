import { Link } from "react-router-dom";

export default function Txt({h, handleClick, size, capital, text, error, bold, color, className, style, link, lineHeight, render}) {
    const txtStyle = {
        'fontSize': size,
        'textTransform': capital ? 'capitalize' : 'none',
        'fontWeight': bold ? bold : 400,
        'color': color,
        'lineHeight': lineHeight || 1,
        'minHeight': 10,
    }
    const conditionalName = `txt${className ? ` ${className}` : ''}${error ? " error-text" : ''}`

    const textJSX = 
        <span className={conditionalName} style = {{...style,...txtStyle}}>
            {text || error}{render}
        </span>;

    const headingsJSX = 
        <>
            {
                (h === '1' && <h1 className={conditionalName} style={{...style,...txtStyle}}>{text}</h1>) ||
                (h === '2' && <h2 className={conditionalName} style={{...style,...txtStyle}}>{text}</h2>) ||
                (h === '3' && <h3 className={conditionalName} style={{...style,...txtStyle}}>{text}</h3>) ||
                (h === '4' && <h4 className={conditionalName} style={{...style,...txtStyle}}>{text}</h4>) ||
                (h === '5' && <h5 className={conditionalName} style={{...style,...txtStyle}}>{text}</h5>) ||
                (h === '6' && <h6 className={conditionalName} style={{...style,...txtStyle}}>{text}</h6>)
            }
        </>
    return (
        <>
        {
            link ? 
            <Link className="lnk pointer" to={link} onClick={handleClick}>
                { h ? headingsJSX : textJSX }
            </Link> :
            h ? headingsJSX : textJSX 
        }
    </>
    )
}