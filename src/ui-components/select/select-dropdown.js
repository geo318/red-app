import { useState } from "react";
import CheckOutsideClick from "./CheckOutsideClick"

export default function Select({render, id, children, className, placeholder, value}) {
    
    const [dropdown, toggleDropdown] = useState(false);
    const handleSelect = (event) => {
        toggleDropdown(e => !e)
    }

    return (
        <div onClick = {handleSelect}>
            <input id={id} className = {className} placeholder={placeholder} value={value} readOnly/>
            <CheckOutsideClick ocClickOustise = {handleSelect}>
                {  
                    dropdown && 
                    <div className ='select-dropdown'>
                        {children || render}
                    </div>
                }
            </CheckOutsideClick>
        </div>
    )
}