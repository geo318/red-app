import { Link } from "react-router-dom";

export default function Txt({size, capital, text, bold, color, className, style, link, lineHeight}) {
    const txtStyle = {
        'fontSize': size,
        'textTransform': capital ? 'capitalize' : 'none',
        'fontWeight': bold ? bold : 400,
        'color': color,
        'lineHeight': lineHeight || 1,
        'minHeight': 10,
    }
    const textJSX = 
        <span className={`txt${className ? ` ${className}` : ''}`} style = {{...style,...txtStyle}}>
            {text}
        </span>;
    return (
        <>
        {
            link ? 
            <Link className="lnk" to={link}>
                {textJSX}
            </Link> :
            textJSX
        }
    </>
    )
}