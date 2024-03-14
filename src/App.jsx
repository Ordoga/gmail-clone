// Libaries
import { Route, HashRouter as Router, Routes } from 'react-router-dom'

// Pages
import { EmailIndex } from "./pages/EmailIndex"
import { EmailDetails } from './cmps/EmailDetails'


// Components
import { EmailList } from './cmps/EmailList'
import { UserMsg } from './cmps/UserMsg'
import { HomePage } from './pages/HomePage'

export function App() {
    return (
        <>
            <Router>
                <section className='main-app'>
                    <div className="main-section">
                        <Routes>
                            <Route path="/" element={<HomePage/>} / >

                            <Route path="/:folder" element={<EmailIndex/>} >
                                <Route path="/:folder/" element={<EmailList/>} />
                                <Route path="/:folder/:emailId" element={<EmailDetails/>} />

                            </Route>
                        </Routes>
                    </div>
                </section>
                <UserMsg/>
            </Router>
        </>
    )
}

