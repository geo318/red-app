export default function Icon({width, alt, render,className}) {

    const iconStyle = {
        'width' : width,
        'height': width,
        'maxWidth' : 250
    }

    return (
        <>
            <div className={className ? `${className}-icon` : 'icon'} style = {iconStyle}>
                {<img src={ render } alt={alt}/>}
            </div>
        </>
    )
}