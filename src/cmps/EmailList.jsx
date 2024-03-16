import { useEffect } from "react"
import { EmailPreview } from "./EmailPreview"
import { useOutletContext } from "react-router-dom"

export function EmailList() {

    const {emails, toggleStar, removeEmail, toggleRead} = useOutletContext()

    useEffect(() => {

    }, [])

    if(!emails){
        return null
    }

    if (emails.length === 0) return <div>No Emails</div>

    return (
        <>
            <div className="list-start"></div>
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