import { Outlet, Navigate } from 'react-router-dom'

export const PrivateRoutes = ({condition, fallback}) => {
    return(
        condition ? <Navigate to={fallback}/> : <Outlet/>
    )
}