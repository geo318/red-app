export default function Divider({width, height, color, className, grow, border}) {

    const flxStyle = {
        "display": "flex",
        "width": width,
        "height": height,
        "background": color,
        "flexGrow": grow,
        "borderBottom": border,
        "marginBottom": border ? height: 0
    }


    return <div className={`flx${className ? ` ${className}` : ''}`} style = {flxStyle}/>
}