// Liabaries
import {NavLink} from 'react-router-dom'

// Assets
import GmailLogo from '/gmail_logo.png'


export function Header() {
    return (
        <>
        <header className="app-header">
            <div className="header">
                <div className="logo-section">
                    <div className="fake-menu-button"></div>
                    <img src={GmailLogo} height='40px'></img>
                </div>

                <div className="search-bar">
                    <nav>
                        <div className='nav-links'>
                            <NavLink to="/homepage">HomePage</NavLink>
                            <NavLink to="/about">About Us</NavLink>
                            <NavLink to="/">MailBox</NavLink>
                        </div>
                    </nav>
                    <div className='search-field'>
                        --------------------------------
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