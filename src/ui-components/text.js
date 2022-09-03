import { Link } from "react-router-dom";

export default function Txt({h, size, capital, text, bold, color, className, style, link, lineHeight}) {
    const txtStyle = {
        'fontSize': size,
        'textTransform': capital ? 'capitalize' : 'none',
        'fontWeight': bold ? bold : 400,
        'color': color,
        'lineHeight': lineHeight || 1,
        'minHeight': 10,
    }
    const conditionalName = `txt${className ? ` ${className}` : ''}`

    const textJSX = 
        <span className={conditionalName} style = {{...style,...txtStyle}}>
            {text}
        </span>;

    const headingsJSX = 
        <>
            {
                (h = '1' && <h1 className={conditionalName} style={{...style,...txtStyle}}>{text}</h1>) ||
                (h = '2' && <h2 className={conditionalName} style={{...style,...txtStyle}}>{text}</h2>) ||
                (h = '3' && <h3 className={conditionalName} style={{...style,...txtStyle}}>{text}</h3>) ||
                (h = '4' && <h4 className={conditionalName} style={{...style,...txtStyle}}>{text}</h4>) ||
                (h = '5' && <h5 className={conditionalName} style={{...style,...txtStyle}}>{text}</h5>) ||
                (h = '6' && <h6 className={conditionalName} style={{...style,...txtStyle}}>{text}</h6>)
            }
        </>
    return (
        <>
        {
            link ? 
            <Link className="lnk" to={link}>
                { h ? headingsJSX : textJSX }
            </Link> :
            h ? headingsJSX : textJSX 
        }
    </>
    )
}