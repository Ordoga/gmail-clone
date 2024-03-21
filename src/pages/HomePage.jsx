import { Link } from "react-router-dom"


export function HomePage(){

    return (
        <>
            <div className="homepage">
                <Link to="/inbox">To Mailbox</Link>
                <Link to="/dashboard">To Dashboad</Link>
            </div>
        </>
    )
}