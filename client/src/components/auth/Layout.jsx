import React from 'react'
import { Outlet } from 'react-router-dom'

const AuthLayout = () => {
    return (
        <div className="flex min-h-screen w-full">
            <div className='hidden lg:flex items-center bg-black w-1/2 px-12'>
                <h1 className='text-white text-4xl font-extrabold tracking-tight'>Welcome to ECommerce Shopping</h1>
            </div>
            <div className='flex flex-1 items-center justify-center px-4 py-12 sm:px-6 lg:px-8'>
                <Outlet/>
            </div>
        </div>
    )
}

export default AuthLayout