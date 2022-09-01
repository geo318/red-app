import { Outlet, Navigate } from 'react-router-dom'

export const PrivateRoutes = ({condition, fallback}) => {
    console.log(condition)
    return(
        condition ? <Outlet/> : <Navigate to={fallback}/>
    )
}