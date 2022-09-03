export default function Icon({width, height, size, alt, render,className}) {

    const iconStyle = {
        'width' : width || size,
        'height': height || size,
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