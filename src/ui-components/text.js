export default function Txt({size, capital, text, bold, color, className, style}) {
    const txtStyle = {
        'fontSize': size,
        'textTransform': capital ? 'capitalize' : 'none',
        'fontWeight': bold ? 600 : 400,
        'color': color,
        'lineHeight': 1,
        'minHeight': 10
    }

    return (
        <div className={`txt${className ? ` ${className}` : ''}`} style = {{...style,...txtStyle}}>
            {text}
        </div>
    )
}