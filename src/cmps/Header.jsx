import GmailLogo from '/gmail_logo.png'

export function Header() {
    return (
        <>
        <header className="app-header">
            <div className="header">
                <div className="left-section">
                    <div className="icon1 icon">1</div>
                    <div className="icon2 icon">2</div>
                    <div className="icon3 icon">3</div>
                    <div className="icon4 icon">4</div>
                </div>
                <div className="searchbar">
                    --------------------------------
                </div>
                <div className="logo-section">
                    <img src={GmailLogo} height='40px'></img>
                    <div className="fake-menu-button"></div>
                </div>
            </div>
        </header>
        </>
    )
}