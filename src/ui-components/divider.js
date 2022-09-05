export default function Divider({width, height, color, className, grow, border, style}) {

    const flxStyle = {
        "display": "flex",
        "width": width,
        "height": height,
        "background": color,
        "flexGrow": grow,
        "borderBottom": border,
    }


    return <div className={`divider flx${className ? ` ${className}` : ''}`} style = {{...flxStyle, style}}/>
}