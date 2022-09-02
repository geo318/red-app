import Icon from "../ui-components/icon";
import submitted from "../assets/images/submitted.png"
import Button from "../ui-components/button";
import Txt from "../ui-components/text";
import Divider from "../ui-components/divider";
import { useEffect } from "react";

export default function Success() {
    useEffect(()=> {
        document.body.style.overflow = "hidden"
        return () => document.body.style.overflow = "auto"
    },[])
    
    return(
        <div className="success flx flx-hc flx-vc" style={{'position':'fixed','inset':0,'height':'100vh'}}>
            <div className="overlay"/>
            <div className="popup flx flx-hc flx-vc flx-c">
                <div className="image-cont">
                    <Icon render={submitted}/>
                </div>
                <Txt text='ჩანაწერი დამატებულია!' bold='700' size='25px'/>
                <Divider height='79px'/>
                <div className="popup-body flx-c flx-hc">
                    <Button text='სიაში გადაყვანა' size='20px' link = "/laptop-list"/>
                    <Divider height='28px'/>
                    <Txt className='txt-link' text='მთავარი' size='20px' lineHeight='24px' bold='500' link='/'/>
                </div>
            </div>
        </div>
    )
}