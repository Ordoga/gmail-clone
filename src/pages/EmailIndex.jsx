import { useEffect, useState} from "react"
import { useParams } from "react-router"
import { useSearchParams } from "react-router-dom"

import { Sidebar } from "../cmps/SideBar"
import { EmailList } from "../cmps/EmailList"
import { emailService } from "../services/email.service"
import { EmailFilter } from "../cmps/EmailFilter"
import { EmailDetails } from "../cmps/EmailDetails"


// TODO - change to all filters

export function EmailIndex() {

    const [searchParams, setSearchParams] = useSearchParams()
    const [emails, setEmails] = useState(null)
    const [filterBy, setFilterBy] = useState(emailService.getFilterFromParams(searchParams))

    
    const params = useParams()

    // Load Emails on Component mount, and every change to Filter By to re-filter

    useEffect(() => {

        setSearchParams(filterBy)
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


    async function toggleStar(emailId){
        const email = await emailService.getById(emailId)
        let newEmail = {...email, isStarred: !email.isStarred}
        await emailService.save(newEmail)
        setEmails((prevEmails) => prevEmails.map(currEmail => currEmail.id === newEmail.id ? newEmail : currEmail))
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
                    {params.emailId? <EmailDetails/> : <EmailList emails={emails} setFilterBy={setFilterBy} toggleStar={toggleStar}/>}
                </div>
            </div>
        </>
    )
}