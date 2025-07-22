import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'

const CheckAuth = ({ isAuthenticated, user, children }) => {
    const location = useLocation();

    if (!isAuthenticated && (location.pathname === "/" || location.pathname.includes('admin') || location.pathname.includes('shop'))) {
        return <Navigate to={'/login'} />
    }

    if (isAuthenticated && (location.pathname.includes('/login') || location.pathname.includes('/register'))) {
        if (user?.role === 'admin') {
            return <Navigate to={'/admin/dashboard'} />
        } else {
            return <Navigate to={'/shop/home'} />
        }
    }

    if (isAuthenticated) {
        if (user?.role === 'admin' && (location.pathname === "/" || location.pathname === "/admin" || location.pathname === "/admin/" || location.pathname.includes("shop"))) {
            return <Navigate to={'/admin/dashboard'} />
        } else if (user?.role === 'user' && (location.pathname === "/" || location.pathname === "/shop" || location.pathname === "/shop/" || location.pathname.includes("admin"))) {
            return <Navigate to={'/shop/home'} />
        }
    }
    
    
    return <>
        {children}
    </>

}

export default CheckAuth
