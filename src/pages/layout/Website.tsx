import React, { useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import FooterComponent from '../components/Footer';
import HeaderHome from '../components/Header';


const Website = () => {
    return (
        <div>
            <HeaderHome />
            <Outlet />
            <FooterComponent />

        </div>

    )
}

export default Website
