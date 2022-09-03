import './spinner.css'


export default function Spinner({size, thickness, color}) {

    const spinnerStyle = {
        'width': `${size}`,
        'height': `${size}`,
        'background': `conic-gradient(#0000 10%, ${color || '#000'})`,
        'mask': `radial-gradient(farthest-side, #0000 calc(100% - ${thickness || '10px'}), #000 0)`,
        'WebkitMask': `radial-gradient(farthest-side, #0000 calc(100% - ${thickness || '10px'}), #000 0)`,
        'borderTopColor': 'transparent',
    }
    return (
        <div className='loading_wrap'>
            <div style = {spinnerStyle} className='loading'/>
        </div>
    )
}