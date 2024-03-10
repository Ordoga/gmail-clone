// Libaries
import { Route, HashRouter as Router, Routes } from 'react-router-dom'

// Pages
import { EmailIndex } from "./pages/EmailIndex"
import { EmailDetails } from './cmps/EmailDetails'

// Components
import { Header } from "./cmps/Header"

export function App() {
    return (
        <Router>
            <section className='main-app'>
                <div className="main-section">
                    <Routes>
                        <Route path="/" element={<EmailIndex/>} >
                            <Route path="/:emailId" element={<EmailDetails/>} />
                        </Route>
                    </Routes>
                </div>
            </section>
        </Router>
    )
}

