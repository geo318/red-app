import Icon from "../ui-components/icon";
import submitted from "../assets/images/submitted.png"

export default function Success() {
    return(
        <div className="success flx flx-hc flx-vc">
            <div className="overlay"/>
            <div className="popup flx flx-hc flx-vc flx-c">
                <div className="image-cont">
                    <Icon render={submitted}/>
                </div>
                <div className="popup-body">
                    {/* <Button/>
                    <Link/>
                    <Heading/> */}
                </div>
            </div>
        </div>
    )
}