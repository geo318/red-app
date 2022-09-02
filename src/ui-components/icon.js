export default function Icon({width, alt, render,className}) {

    const iconStyle = {
        'width' : width,
        'height': width,
        'maxWidth' : '100%'
    }

    return (
        <>
            <div className={className ? `${className}-image` : 'image'} style = {iconStyle}>
                {<img src={ render } alt={alt}/>}
            </div>
        </>
    )
}