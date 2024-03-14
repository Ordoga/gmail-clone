import { useEffect, useState} from "react"
import { Outlet, useParams } from "react-router"
import { useSearchParams } from "react-router-dom"

import { Sidebar } from "../cmps/SideBar"
import { emailService } from "../services/email.service"
import { EmailFilter } from "../cmps/EmailFilter"
import { EmailCompose } from "../cmps/EmailCompose"

import { eventBusService } from "../services/event-bus-service"

export function EmailIndex() {

    const [searchParams, setSearchParams] = useSearchParams()
    const [emails, setEmails] = useState(null)
    const [filterBy, setFilterBy] = useState(emailService.getFilterFromParams(searchParams))
    const [unreadCount, setUnreadCount] = useState(getUnreadCount())
    const [sortBy, setSortBy] = useState(emailService.getSortByFromParams(searchParams))
    // Update due to searchParams
    // const [isComposing, setIsComposing] = useState(false)


    const params = useParams()

    // Update search params and emails with every change to filter
    useEffect(() => {
        onUpdateSearchParams() 
        setFilterBy(() => (filterBy))
        loadEmails(filterBy)
    }, [filterBy])

    // Change folders
    useEffect(() => {
        const newFilter = {...filterBy, status:params.folder}
        setFilterBy(() => (newFilter))
    }, [params.folder])

    // Change sort
    useEffect(() => {
        onUpdateSearchParams()
        setSortBy(() => sortBy)
        loadEmails()
    }, [sortBy])

    function composeEmail(){
        setSearchParams((prevParams) => ({...prevParams, compose:'new'}))
        // setIsComposing((prevIsComposing) => true)
    }

    function exitCompose(){
        // setIsComposing((prevIsComposing) => false)
        searchParams.delete('compose')
        onUpdateSearchParams()
    }

    function onUpdateSearchParams(){
        const updatedParams = {}
        if(filterBy.txt !== ''){
            updatedParams.txt = filterBy.txt
        }
        if(filterBy.isRead !== 'undifined'){
            updatedParams.isRead = filterBy.isRead
        }
        if(sortBy.sort === 'ascending'){
            updatedParams.sort = 'ascending'
        }
        if(sortBy.sortType !== 'date'){
            updatedParams.sortType = sortBy.sortType
        }
        if(searchParams.get('compose')){
            updatedParams.compose = 'new'
        }
        setSearchParams(updatedParams)
    }
    
    async function loadEmails(){
        try {
            const emails = await emailService.query(filterBy,sortBy)
            setEmails(emails)
        } catch (err) {
            console.log(`Error in loading: ${err}`)
        }
    }

    function onSetFilter(fieldsToUpdate){
        setFilterBy((prevFilter) => ({...prevFilter,...fieldsToUpdate}))
    }

    function onSetSort(fieldsToUpdate){
        setSortBy((prevSort) => ({...prevSort, ...fieldsToUpdate}))
    }


    async function toggleStar(emailId){
        const email = await emailService.getById(emailId)
        let newEmail = {...email, isStarred: !email.isStarred}
        await emailService.save(newEmail)
        // TODO To Filter
        setEmails((prevEmails) => prevEmails.map(currEmail => currEmail.id === newEmail.id ? newEmail : currEmail))
        eventBusService.emit('show-user-msg', {type: 'success', txt:`Email Marked As ${newEmail.isStarred   ? "Starred" : "Unstarred"}`})
    }
    
    async function toggleRead(emailId){
        const email = await emailService.getById(emailId)
        let newEmail = {...email, isRead: !email.isRead}
        await emailService.save(newEmail)
        // TODO To Filter
        setEmails((prevEmails) => prevEmails.map(currEmail => currEmail.id === newEmail.id ? newEmail : currEmail))
        eventBusService.emit('show-user-msg', {type: 'success', txt:`Email Marked As ${newEmail.isRead? "Read" : "Unread"}`})
    }
    
    
    // TODO  Trash isn't refreshing after removal

    async function removeEmail(emailId) {
        try{
            const email = await emailService.getById(emailId)
            if(email.removedAt){
                // Delete from trash
                emailService.removeById(emailId)
                const index = emails.findIndex(email => email.id === emailId)
                if(index < 0) throw new Error(`Remove failed, cannot find email with id: ${emailId}`)
                setEmails((prevEmails) => prevEmails.splice(index,1))
                eventBusService.emit('show-user-msg', {type: 'success', txt:'Email Deleted Permanently'})
            }else{
                // Move to trash
                let newEmail = {...email, removedAt: Date.now()}
                await emailService.save(newEmail)
                // TODO Filter
                setEmails((prevEmails) => prevEmails.map(currEmail => currEmail.id === newEmail.id ? newEmail : currEmail))
                eventBusService.emit('show-user-msg', {type: 'success', txt:'Email Moved To Trash'})
            }
        }catch(err){
            console.log(`Error: ${err}`)
            eventBusService.emit('show-user-msg', {type: 'error', txt:'Could not delete email'})

        }
        await loadEmails()
    }

    async function getUnreadCount(){
        const count = await emailService.getUnreadCount()
        setUnreadCount(prevCount => count)
    }
    
    async function markRead(emailId){
        const email = await emailService.getById(emailId)
        let newEmail = {...email, isRead: true}
        await emailService.save(newEmail)
        setEmails((prevEmails) => prevEmails.map(currEmail => currEmail.id === newEmail.id ? newEmail : currEmail))
    }

    function createContext() {
        if(params.emailId){
            // Context for EmailDetails
            return { removeEmail, markRead }
        }
        else {
            // Context for EmailList
            return  { emails, setFilterBy, toggleStar, removeEmail, toggleRead}
        }
    }
    
    emailService.createEmails()

    const { txt, status, isRead} = filterBy

    return (
        <>
            <div className="email-index">
                <Sidebar filterBy={ {status} } unreadCount={unreadCount} onSetFilter={onSetFilter} composeEmail={composeEmail} />

                <div className="main-app-section">
                    <EmailFilter filterBy={ {txt, isRead} } sortBy={sortBy} onSetFilter={onSetFilter} onSetSort={onSetSort}/>
                    <Outlet context={createContext()} />

                    {searchParams.get('compose') && <EmailCompose searchParams={searchParams} exitCompose={exitCompose}/>}
                    
                </div>
            </div>
        </>
    )
}