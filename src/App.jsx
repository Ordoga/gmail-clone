// Libaries
import { Route, HashRouter as Router, Routes } from 'react-router-dom'
import { useState } from 'react'


// Pages
import { HomePage } from "./pages/HomePage"
import { AboutUs } from "./pages/AboutUs"
import { MailBox } from "./cmps/MailBox"

// Components
import { Header } from "./cmps/Header"




export function App() {

    const [textToFilterBy, setTextToFilterBy] = useState('')

    return (
        <Router>
            <section className='main-app'>
                <Header textToFilterBy={textToFilterBy} setTextToFilterBy={setTextToFilterBy}/>
                {console.log(`From App: ${textToFilterBy}`)}
                <div className="main-section">
                    <Routes>
                        <Route path="/" element={<MailBox textToFilterBy={textToFilterBy}/>} />
                        <Route path="/homepage" element={<HomePage/>} />
                        <Route path="/about" element={<AboutUs/>} />
                    </Routes>
                </div>
            </section>
        </Router>
    )
}

