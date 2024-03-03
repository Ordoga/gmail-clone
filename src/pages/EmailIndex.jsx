import { useEffect, useState } from "react"

import { EmailList } from "../cmps/EmailList"
import { emailService } from "../services/email.service"


// TODO - change to all filters

export function EmailIndex( { filterBy, setFilterBy } ) {

    const [emails, setEmails] = useState(null)
    const [readyFilter, setReadyFilter] = useState(filterBy? filterBy : emailService.getDefaultFilter())


    // Load Emails on Component mount, and every change to Filter By to re-filter
    useEffect(() => {

        setFilterBy(() => (filterBy))
        loadEmails(filterBy)

    }, [filterBy])


    async function loadEmails(){
        try {
            const emails = await emailService.query(filterBy)
            setEmails(emails)
        } catch (err) {
            console.log(`Error in loading: ${err}`)
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