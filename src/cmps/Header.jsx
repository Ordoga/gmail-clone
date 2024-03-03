// Liabaries
import { NavLink } from 'react-router-dom'
import { useState } from 'react'

// Assets
import GmailLogo from '/gmail_logo.png'


// Props from App.jsx
export function Header( {textToFilterBy, setTextToFilterBy}) {

    function handleOnChange(ev){
        const txt = ev.target.value
        setTextToFilterBy(() => txt)
    }

    function handleOnSubmit(ev){
        ev.preventDefault()
        console.log(ev)
    }

    return (
        <>
        <header className="app-header">
            <div className="header">
                <div className="logo-section">
                    <div className="fake-menu-button"></div>
                    <img src={GmailLogo} height='40px'></img>
                </div>

                <div>
                    <nav>
                        <div className='nav-links'>
                            <NavLink to="/homepage">HomePage</NavLink>
                            <NavLink to="/about">About Us</NavLink>
                            <NavLink to="/">MailBox</NavLink>
                        </div>
                    </nav>
                </div>

                <div className="search-bar">
                    <div className='search-field'>
                        <form onSubmit={handleOnSubmit}>
                            <input type="text" name="text-to-search" value={textToFilterBy} onChange={handleOnChange} placeholder='Search Emails'/>
                        </form>
                    </div>
                </div>



                <div className="right-section">
                    <div className="icon4 icon">4</div>
                    <div className="icon3 icon">3</div>
                    <div className="icon2 icon">2</div>
                    <div className="icon1 icon">1</div>
                </div>
            </div>
        </header>
        </>
    )
}