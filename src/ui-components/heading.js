
import { weatherData } from "../contexts/weather-data-context"
import { useContext } from "react"
import Spinner from "./spinner/spinner"

export default function Heading({h1,h2,h3,h4,h5,h6,className,text,bold}) {
    const data = useContext(weatherData)
    const hStyle = {
        'fontWeight':bold
    }

    const loadingStyle = !data || !text ? {
        'backgroundColor': '#eee',
        'width': '100%',
        'color': 'transparent',
        'display':'table',
        'lineHeight': 1,
        'height': 20
    } : {}

    return (       
        <>
            <div className={`${data ? 'flx' : 'block'} heading${className ? className : ''} ${data || text ? '' : 'filler'}`} style = {loadingStyle}>
                {
                    (h1 && <h1 style={hStyle}>{text}</h1>) ||
                    (h2 && <h2 style={hStyle}>{text}</h2>) ||
                    (h3 && <h3 style={hStyle}>{text}</h3>) ||
                    (h4 && <h4 style={hStyle}>{text}</h4>) ||
                    (h5 && <h5 style={hStyle}>{text}</h5>) ||
                    (h6 && <h6 style={hStyle}>{text}</h6>)
                }
            </div>
        </>
    )
}