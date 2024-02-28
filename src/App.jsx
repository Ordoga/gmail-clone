import { Header } from "./cmps/Header"
import { EmailIndex } from "./cmps/EmailIndex"
import { Sidebar } from "./cmps/SideBar"



export function App() {

    return (
        <section className='main-app'>
            <Header/>
            <div className="main-section">
                <EmailIndex/>
                <Sidebar/>
            </div>
        </section>
    )
}

