import { useEffect } from "react"
import { EmailPreview } from "./EmailPreview"

export function EmailList({emails}) {



    useEffect(() => {
        console.log(emails)
    }, [])

    if(!emails){
        return null
    }

    return (
        <>
            <ul className="email-list">
                    {
                        emails.map(email =>
                            <li key={email._id}>
                                <EmailPreview email={email}/>
                            </li>
                        )
                    }
                    <div className="list-end"></div>
            </ul>
        </>
    )
}