import {useRef, useEffect} from 'react'

export default function CheckOutsideClick({ocClickOustise, children}) {
    const ref = useRef()

    const handleClickOutside = e => {
        if(ref.current && !ref.current.contains(e.target)) {
            ocClickOustise && ocClickOustise()
        }
    }

    useEffect(()=> {
        document.addEventListener('click', handleClickOutside, true)
        return () => document.removeEventListener('click', handleClickOutside, true)
    },[]);

    if(!children) return null
    return <div ref={ref}>{children}</div>
}