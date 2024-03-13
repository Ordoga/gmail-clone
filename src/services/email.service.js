import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'



export const emailService = {
    query,
    getById,
    removeById,
    save,
    createEmail,
    createEmails,
    getDefaultFilter,
    getFilterFromParams,
    getUnreadCount
}

const loggedinUser = { email: 'user@appsus.com', fullname: 'Mahatma Appsus' }

const STORAGE_KEY = 'emails'

async function query(filterBy) {
    let emails = await storageService.query(STORAGE_KEY)
    if(filterBy){
        // Takes the corresponding fields from filter Object
        let { status, txt, isRead } = filterBy
        console.log(filterBy)
        emails = filterByTxt(emails, txt)
        emails = filterByFolder(emails, status)
    }
        // TODO - add more filters
    return emails
}

function getFilterFromParams(searchParams) {
    const defaultFilter = getDefaultFilter()
    const filterBy = {}
    for (const field in defaultFilter) {
        filterBy[field] = searchParams.get(field) || defaultFilter[field]
    }
    return filterBy
}

function filterByFolder(emails, status){
    switch(status) {
        case 'inbox':
            emails = emails.filter(email => email.to === loggedinUser.email && email.removedAt === null)
            break;   
        case 'star':
            emails = emails.filter(email => email.isStarred && email.removedAt === null)
            break;
        case 'trash':
            emails = emails.filter(email => email.removedAt !== null)
            break;
        case 'sent':
            emails = emails.filter(email => email.from === loggedinUser.email && email.removedAt === null)
            break;
        case 'draft':
            emails = emails.filter(email => email.from === loggedinUser.email && email.sentAt === null)
            break;
        default:
    }
    return emails
}

function filterByTxt(emails, txt) {
    emails = emails.filter(email => ((email.subject.toLowerCase().includes(txt.toLowerCase())) || 
    (email.body.toLowerCase().includes(txt.toLowerCase()))    ||
    (email.from.toLowerCase().includes(txt.toLowerCase()))    ))

    return emails
}

async function getUnreadCount(){
    let emails = await storageService.query(STORAGE_KEY)
    emails = filterByFolder(emails,'inbox')
    let counter = 0
    emails.forEach(email => {
        if(!email.isRead){
            counter++
        }
    })
    return counter
}

async function getById(id) {
    try {
        var email = await storageService.get(STORAGE_KEY,id)
        return email
    } catch (err) {
        console.log(`error: ${err}`)
    }
}

async function removeById(id) {
    try {
        var idx = await storageService.remove(STORAGE_KEY, id)
        return idx
    } catch (err) {
        console.log(`error: ${err}`)
    }
}

async function save(emailToSave) {
    // Email is database already -> Update email in database
    if(emailToSave.id){
        return storageService.put(STORAGE_KEY,emailToSave)
        // Email is not in database yet -> Add new email and index it
    } else {
        return storageService.post(STORAGE_KEY,emailToSave)
    }
}

function createEmail(subject= 'No Subject Entered', body='', isRead=false, isStarred=false, sentAt=Date.now(), removedAt=null, from,to){
    return {
        subject,
        body,
        isRead,
        isStarred,
        sentAt,
        removedAt,
        from,
        to
    }
}

function getDefaultFilter() {
    return (
        {
            status: 'inbox',
            txt: '',
            isRead: null
        }
    )
}

function createEmails() {
    let emails = utilService.loadFromStorage(STORAGE_KEY)
    if(!emails) {
        emails = [
            {
                id: 'e1', 
                subject: 'New Toyota Corola for sale!',
                body: 'best price in town, everybody come see!!!!',
                isRead: false,
                isStarred: false,
                sentAt: 1551133930594,
                removedAt: null,
                from: 'toyota@japan.com',
                to: 'user@appsus.com'
            },
            {
                id: 'e2', 
                subject: 'Coding Academy pre-background course is the best!',
                body: 'we are delighted to announce we won the price for best Full-Stack course on plant earth',
                isRead: true,
                isStarred: false,
                sentAt: 1551133345734,
                removedAt: null,
                from: 'coding@academy.com',
                to: 'user@appsus.com'
            },
            {
                id: 'e3', 
                subject: 'Job Offer from: Apple',
                body: 'Full-Stack junior developer job position has opened - reply this email with your CV',
                isRead: true,
                isStarred: true,
                sentAt: 15511339238024,
                removedAt: null,
                from: 'apple@apple.com',
                to: 'user@appsus.com'
            },
            {
                id: 'e4', 
                subject: 'Job Offer from: Google',
                body: 'Apple job offer sucks! come work with us <3',
                isRead: true,
                isStarred: true,
                sentAt: 1551133000000,
                removedAt: null,
                from: 'google@gmail.com',
                to: 'user@appsus.com'
            },
            {
                id: 'e5', 
                subject: 'I want an hamburger',
                body: 'With Cheddar please',
                isRead: true,
                isStarred: true,
                sentAt: 155113300000134,
                removedAt: null,
                from: 'user@appsus.com',
                to: 'wolt@service.co.il'
            }
        ]
        utilService.saveToStorage(STORAGE_KEY,emails)
    }
}

