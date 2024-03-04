import { useEffect, useState } from "react"

import { Sidebar } from "../cmps/SideBar"

import { EmailList } from "../cmps/EmailList"
import { emailService } from "../services/email.service"
import { EmailFilter } from "../cmps/EmailFilter"


// TODO - change to all filters

export function EmailIndex() {

    const [emails, setEmails] = useState(null)

    const [filterBy, setFilterBy] = useState(emailService.getDefaultFilter())

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

                <Sidebar filterBy={filterBy} setFilterBy={setFilterBy}/>

                <div className="main-app-section">
                    <EmailFilter setFilterBy={setFilterBy}/>
                    <EmailList emails={emails}/>
                </div>
            </div>
        </>
    )
}