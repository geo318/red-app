import {useRef, useEffect, useCallback} from 'react'

export default function CheckOutsideClick({onClickOutside, children}) {
    const ref = useRef()

    const handleClickOutside = useCallback(e => {
        if(ref.current && !ref.current.contains(e.target)) {
            onClickOutside && onClickOutside()
        }
    },[onClickOutside])

    useEffect(()=> {
        document.addEventListener('click', handleClickOutside, true)
        return () => document.removeEventListener('click', handleClickOutside, true)
    },[handleClickOutside]);

    if(!children) return null
    return <div ref={ref}>{children}</div>
}