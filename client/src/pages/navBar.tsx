import React from 'react'
import './style/navBarStyle.css'

export default function NavBar() {
    return (
        <div className='navFather'>
            <nav>
                <a href='/signin'>Sign In</a>
                <a href='/signup'>Sign Up</a>
                <a href='/dashboard'>Dashboard</a>
                <div className='animation start-home'></div>
            </nav>
        </div>
    )
}
