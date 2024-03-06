// Libaries
import { Route, HashRouter as Router, Routes } from 'react-router-dom'
import { useState } from 'react'


// Pages
import { HomePage } from "./pages/HomePage"
import { AboutUs } from "./pages/AboutUs"
import { EmailIndex } from "./pages/EmailIndex"

// Components
import { Header } from "./cmps/Header"




export function App() {


    return (
        <Router>
            <section className='main-app'>

                {/* <Header/> */}

                <div className="main-section">
                    <Routes>
                        <Route path="/" element={<EmailIndex/>} />
                    </Routes>
                </div>
            </section>
        </Router>
    )
}

