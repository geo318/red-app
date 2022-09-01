import { Outlet, Navigate } from 'react-router-dom'

export const PrivateRoutes = ({condition, fallback}) => {
    return(
        condition ? <Outlet/> : <Navigate to={fallback}/>
    )
}