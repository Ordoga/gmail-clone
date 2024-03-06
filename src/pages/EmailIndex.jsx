import { useEffect, useState} from "react"
import { useParams } from "react-router"

import { Sidebar } from "../cmps/SideBar"

import { EmailList } from "../cmps/EmailList"
import { emailService } from "../services/email.service"
import { EmailFilter } from "../cmps/EmailFilter"
import { EmailDetails } from "../cmps/EmailDetails"


// TODO - change to all filters

export function EmailIndex() {

    const [emails, setEmails] = useState(null)

    const [filterBy, setFilterBy] = useState(emailService.getDefaultFilter())

    const params = useParams()

    // Load Emails on Component mount, and every change to Filter By to re-filter

    useEffect(() => {

        setFilterBy(() => (filterBy))
        loadEmails(filterBy)

    }, [filterBy])


    function onSetFilter(fieldsToUpdate){
        setFilterBy((prevFilter) => ({...prevFilter,...fieldsToUpdate}))
    }


    async function loadEmails(){
        try {
            const emails = await emailService.query(filterBy)
            setEmails(emails)
        } catch (err) {
            console.log(`Error in loading: ${err}`)
        }
    }


    emailService.createEmails()


    const { txt, status } = filterBy

    if (!emails) return <div>Loading..</div>
    return (
        <>
            <div className="email-index">

                <Sidebar filterBy={ {status} } onSetFilter={onSetFilter}/>

                <div className="main-app-section">
                    <EmailFilter filterBy={{txt}} onSetFilter={onSetFilter}/>
                    {params.emailId? <EmailDetails/> : <EmailList emails={emails} setFilterBy={setFilterBy}/>}
                </div>
            </div>
        </>
    )
}