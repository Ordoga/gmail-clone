// Libaries
import { Route, HashRouter as Router, Routes } from 'react-router-dom'

// Pages
import { HomePage } from "./pages/HomePage"
import { AboutUs } from "./pages/AboutUs"
import { MailBox } from "./cmps/MailBox"

// Components
import { Header } from "./cmps/Header"

export function App() {

    return (
        <Router>
            <section className='main-app'>
                <Header/>


                <div className="main-section">
                    <Routes>
                        <Route path="/" element={<MailBox/>} />
                        <Route path="/homepage" element={<HomePage/>} />
                        <Route path="/about" element={<AboutUs/>} />
                    </Routes>
                </div>
            </section>
        </Router>
    )
}

