import Button from "./button";
import Icon from "./icon";
import arrow from "../assets/images/arrow.svg"

export default function Header({link, render, renderStyle}) {
    return (
        <div className="header-wrap">
            <div className="flx-r">
                <Button 
                    render={<Icon render={arrow} height='16px' className="flx flx-hc flx-vc back"/>}
                    className="button-back flx flx-hc flx-vc flx-self-top"
                    link = {link}
                />
                <div className="flx-r flx-hc flx-grow" style={renderStyle}>
                    {render}
                </div>

            </div>
        </div>
    )
}