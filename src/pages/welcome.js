import welcome from "../assets/images/welcome.png"
import Icon from "../ui-components/icon"
import Button from "../ui-components/button"
import Divider from "../ui-components/divider"
import logo from "../assets/images/logo.svg"
import { useContext } from "react"
import { mobileDevice } from "../contexts/mobile-device"
import welcomeMobile from "../assets/images/welcome-mobile.png"
import "../assets/css/welcome.css"
import loadingImage from "../assets/images/loading.jpg"
import Spinner from "../ui-components/spinner/spinner"

export default function Welcome() {
    const {isMobile} = useContext(mobileDevice);
    return(
        <>
        <div className="flx flx-hc flx-vc" style={{'minHeight':'100vhgit commit -m "new-dep"'}}>
            <div className="welcome flx flx-hc flx-vc flx-c">
                <div className="image-cont flx-c flx-vc">
                    {isMobile && <Divider height='40px'/>}
                    <Icon render={logo} width='112px'/>
                    <Divider height={isMobile? '117px' : '85px'}/>
                    {
                        <Icon render={(isMobile && welcomeMobile) || welcome}/> ||
                        <>
                            <img alt='' src={loadingImage}/>
                            <Spinner color = "#62a1eb" size = '70px'/>
                        </>
                    }
                </div>
                <Divider height='123px'/>
                <div className="welcome-body flx-c flx-hc">
                    <Button text='ᲩᲐᲜᲐᲬᲔᲠᲘᲡ ᲓᲐᲛᲐᲢᲔᲑᲐ' size='20px' link = "/form/coworkers"/>
                    <Divider height={isMobile? '16px' : '26px'}/>
                    <Button text='ᲩᲐᲜᲐᲬᲔᲠᲔᲑᲘᲡ ᲡᲘᲐ' size='20px' link = "/laptop-list"/>
                </div>
                { isMobile && <Divider height='20px'/> }
            </div>
        </div>
        </>
    )
}