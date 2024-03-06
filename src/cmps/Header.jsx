// Liabaries
import { NavLink } from 'react-router-dom'
import { useState } from 'react'

export function Header() {

    return (
        <>
        <header className="app-header">
            {/* <div className="header">
                <div className="logo-section">
                    <div className="menu-button">
                        <img src={Hamburger} className='white-icon'></img>
                    </div>
                    <img src={GmailLogo} height='40px' style={{fill: 'red'}}></img>
                </div> */}

                
            
                <div className='nav-links'>
                    <NavLink to="/homepage">HomePage</NavLink>
                    <NavLink to="/about">About Us</NavLink>
                    <NavLink to="/">MailBox</NavLink>
                </div>
            
                


                {/* <div className="search-bar">
                    <div className='search-field'>
                        <form onSubmit={handleOnSubmit}>
                            <input type="text" name="text-to-search" value={textToFilterBy} onChange={handleOnChange} placeholder='Search Emails'/>
                        </form>
                    </div>
                </div> */}



                {/* <div className="right-section">
                    <div className="small-icon-container"><img className="small-icon-img" src={QuestionMark}></img></div>
                    <div className="small-icon-container"><img className="small-icon-img" src={Settings}></img></div>
                    <div className="medium-icon-container"><img className="medium-icon-img" src={Dots}></img></div>
                    <div className="icon1 icon">1</div>
                </div>
            </div>
            */}
        </header>
        </>
    )
}