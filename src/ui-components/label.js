import Divider from "./divider"
import Flx from "./flex"
import Txt from "./text"

export default function Label({label, lineHeight, text, lSize, tSize, className, gap, lBold, tBold, data=[]}) {
    const loadingStyle = !data ? {
        'backgroundColor': '#eee',
        'width': '100%',
        'color': 'transparent',
    } : {}

    return (
        <div className={`flx${className ? ` ${className}` : ''}`}>
            <Flx render = {[
                <Txt key = 'label' lineHeight={lineHeight} bold = {lBold} style = {{...{'flex-grow':1},...loadingStyle}} text = {data && label} size={lSize} className= {`${data ? 'label-val' : 'label filler'}`} />,
                <Divider key='div' width = {gap}/>,
                <Txt key = 'label-val' lineHeight={lineHeight} bold = {tBold} style = {loadingStyle}  text = {data && text} size={tSize} className= {`${data ? 'label-val' : 'label-val filler'}`} />,
            ]}/>
        </div>
    )
}