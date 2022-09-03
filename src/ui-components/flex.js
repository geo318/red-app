import Spinner from "./spinner/spinner"

export default function Flx({hCenter, vCenter, render, className, column, grow, width}) {
    const flxStyle = {
        "display": "flex",
        "justifyContent": vCenter || 'center',
        "alignItems": hCenter || 'center',
        "flexDirection": column ? 'column' : 'row',
        'flexGrow': grow ? 1 : '0',
        'width': width ? width: '100%',
    }

    return (
        <div className={`flx${className ? ` ${className}` : ''}`} style = {flxStyle}>
            { 
                render?.map((e, i) => e ) || <Spinner width = '30' color = '#f8b62d'/>
            }
        </div>
    )
}