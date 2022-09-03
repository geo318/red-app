import welcome from "../assets/images/welcome.png"
import Icon from "../ui-components/icon"
import Button from "../ui-components/button"
import Divider from "../ui-components/divider"

export default function Welcome() {
    return(
        <>
            <div className="success flx flx-hc flx-vc" style={{'position':'fixed','inset':0,'height':'100vh'}}>
            <div className="welcome flx flx-hc flx-vc flx-c">
                <div className="image-cont">
                    <Icon render={welcome}/>
                </div>
                <Divider height='123px'/>
                <div className="welcome-body flx-c flx-hc">
                    <Button text='ᲩᲐᲜᲐᲬᲔᲠᲘᲡ ᲓᲐᲛᲐᲢᲔᲑᲐ' size='20px' link = "/form/coworkers"/>
                    <Divider height='26px'/>
                    <Button text='ᲩᲐᲜᲐᲬᲔᲠᲔᲑᲘᲡ ᲡᲘᲐ' size='20px' link = "/laptop-list"/>
                </div>
            </div>
        </div>
        </>
    )
}