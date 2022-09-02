import { useState } from "react"

export default function InputDate({placeholder, value, className, handleChange, ...inputProps}) {
    const [styleText, setStyleText] = useState({'visibility':'visible', 'position':'absolute', 'inset':0});
    const [styleDate, setStyleDate] = useState({'opacity': value ? 1 : 0, 'userSelect':'none'});

    return (
        <div className={className} style={{'position':'relative'}}>
                     <input type = 'text' style = {styleText} placeholder = {placeholder} readOnly/>
                     <input type = 'date'
                        onChange = {handleChange}
                        onBlur = {()=> !value && setStyleDate({...styleDate, opacity : 0})} 
                        onClick={()=> setStyleDate({...styleDate, opacity : 1})} 
                        style = {styleDate} 
                        {...inputProps}
                    /> 
        </div>
    )
}