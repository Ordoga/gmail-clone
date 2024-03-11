import { useEffect } from "react"
import { EmailPreview } from "./EmailPreview"


export function EmailList({emails, toggleStar, removeEmail, toggleRead}) {

    useEffect(() => {

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
                                <EmailPreview email={email} toggleStar={toggleStar} removeEmail={removeEmail} toggleRead={toggleRead}/>
                            </li>
                        )
                    }
                    <div className="list-end"></div>
            </ul>
        </>
    )
}