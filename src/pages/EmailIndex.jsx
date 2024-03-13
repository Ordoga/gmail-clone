import { useEffect, useState} from "react"
import { Outlet, useParams } from "react-router"
import { useSearchParams } from "react-router-dom"

import { Sidebar } from "../cmps/SideBar"
import { emailService } from "../services/email.service"
import { EmailFilter } from "../cmps/EmailFilter"


// TODO - change to all filters

export function EmailIndex() {

    const [searchParams, setSearchParams] = useSearchParams()
    const [emails, setEmails] = useState(null)
    const [filterBy, setFilterBy] = useState(emailService.getFilterFromParams(searchParams))
    const [unreadCount, setUnreadCount] = useState(getUnreadCount())
    const params = useParams()

    // Load Emails on Component mount, and every change to Filter By to re-filter

    useEffect(() => {
        sanitizeSearchParams() 
        setFilterBy(() => (filterBy))
        loadEmails(filterBy)

    }, [filterBy])

    function sanitizeSearchParams(){
        const updatedParams = {}
        if(filterBy.txt !== ''){
            updatedParams.txt = filterBy.txt
        }
        if(filterBy.isRead !== null){
            updatedParams.isRead = filterBy.isRead
        }
        setSearchParams(updatedParams)
    }

    function onChangeFilter(){
        const newFilter = {txt:filterBy.txt, isRead:filterBy.isRead}
    }

    

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

    async function markRead(emailId){
        const email = await emailService.getById(emailId)
        let newEmail = {...email, isRead: true}
        await emailService.save(newEmail)
        setEmails((prevEmails) => prevEmails.map(currEmail => currEmail.id === newEmail.id ? newEmail : currEmail))
    }

    async function toggleRead(emailId){
        const email = await emailService.getById(emailId)
        let newEmail = {...email, isRead: !email.isRead}
        await emailService.save(newEmail)
        setEmails((prevEmails) => prevEmails.map(currEmail => currEmail.id === newEmail.id ? newEmail : currEmail))
    }

    // TODO  Trash isn't refreshing after removal

    async function removeEmail(emailId) {
        try{
            const email = await emailService.getById(emailId)
            if(email.removedAt){
                emailService.removeById(emailId)
                const index = emails.findIndex(email => email.id === emailId)
                if(index < 0) throw new Error(`Remove failed, cannot find email with id: ${emailId}`)
                setEmails((prevEmails) => prevEmails.splice(index,1))
            }else{
                let newEmail = {...email, removedAt: Date.now()}
                await emailService.save(newEmail)
                setEmails((prevEmails) => prevEmails.map(currEmail => currEmail.id === newEmail.id ? newEmail : currEmail))
            }
        }catch(err){
            console.log(`Error: ${err}`)
        }
        await loadEmails()
    }

    async function getUnreadCount(){
        const count = await emailService.getUnreadCount()
        setUnreadCount(prevCount => count)
    }


    emailService.createEmails()

    const { txt, status, isRead} = filterBy

    function createContext() {
        if(params.emailId){
            return { removeEmail, markRead }
        }
        else {
            return  { emails, setFilterBy, toggleStar, removeEmail, toggleRead}
        }
    }

    if (!emails) return <div>Loading..</div>
    return (
        <>
            <div className="email-index">
                <Sidebar filterBy={ {status} } unreadCount={unreadCount} onSetFilter={onSetFilter}/>

                <div className="main-app-section">
                    <EmailFilter filterBy={ {txt, isRead} } onSetFilter={onSetFilter}/>
                    <Outlet context={createContext()} />
                </div>
            </div>
        </>
    )
}