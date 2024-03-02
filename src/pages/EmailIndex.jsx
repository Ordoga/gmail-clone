import { useEffect, useState } from "react"

import { EmailList } from "../cmps/EmailList"
import { emailService } from "../services/email.service"

export function EmailIndex() {

    const [emails, setEmails] = useState(null)

    useEffect(() => {
        loadEmails()
    }, [])


    async function loadEmails(){
        try {
            const emails = await emailService.query()
            setEmails(emails)
        } catch (err) {
            console.log(`error: ${err}`)
        }
    }

    emailService.createEmails()



    if (!emails) return <div>Loading..</div>
    return (
        <>
            <div className="email-index">
                <div className="page-nav"></div>
                <div className="folders"></div>
                
                <EmailList emails={emails}/>
            </div>
        </>
    )
}