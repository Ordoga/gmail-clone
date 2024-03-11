import { Link } from "react-router-dom"


export function HomePage(){

    return (
        <>
            <div>
                <Link to="/inbox">To Mailbox</Link>
            </div>
        </>
    )
}