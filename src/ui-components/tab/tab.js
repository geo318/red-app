import Txt from "../text"
import Divider from "../divider"

export default function Tab({handleClick}) {
    return (
        <>  
            <div className="flx-c flx-hc flx-vc">
                <Txt bold='700' size='20px' lineHeight='24px' color='#000' text={'თანამშრომლის ინფო'} link='/form/coworkers'/>
                <Divider height='15px' border={`2px solid ${window?.location.pathname === '/form/coworkers' ? '#000' : 'transparent'}`} width='calc(100% - 38px)'/>
            </div>
            <Divider width={'66px'}/>
            <div className="flx-c flx-hc flx-vc">
                <Txt bold='700' handleClick={handleClick} size='20px' lineHeight='24px' color='#000' text={'ლეპტოპის მახასიათებლები'} link='/form/laptop'/>
                <Divider height='15px' border={`2px solid ${window?.location.pathname === '/form/laptop' ? '#000' : 'transparent'}`} width='calc(100% - 38px)'/>
            </div>
        </>
    )
}