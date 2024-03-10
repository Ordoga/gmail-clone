import { useEffect } from "react"
import { EmailPreview } from "./EmailPreview"
import { EmailFilter } from "./EmailFilter"
export function EmailList({emails, toggleStar}) {



    useEffect(() => {
        console.log(emails)
    }, [])

    if(!emails){
        return null
    }

    return (
        <>
            <ul className="email-list">
            <div className="sorting"></div>
                    {

                        emails.map(email =>
                            <li key={email.id}>
                                <EmailPreview email={email} toggleStar={toggleStar}/>
                            </li>
                        )
                    }
                    <div className="list-end"></div>
            </ul>
        </>
    )
}