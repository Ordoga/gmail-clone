import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'

export const emailService = {
    query,
    getById,
    removeById,
    save,
    createEmail,
    createEmails
}

const STORAGE_KEY = 'emails'

async function query() {
    const emails = await storageService.query(STORAGE_KEY)
    return emails
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

function createEmails() {
    let emails = utilService.loadFromStorage(STORAGE_KEY)
    if(!emails || emails.length < 4) {
        emails = [
            {
                _id: 'e1', 
                subject: 'New Toyota Corola for sale!',
                body: 'best price in town, everybody come see!!!!',
                isRead: false,
                isStarred: false,
                sentAt: 1551133930594,
                removedAt: null,
                from: 'toyota@japan.com',
                to: 'ordoga@gmail.com'
            },
            {
                _id: 'e2', 
                subject: 'Coding Academy pre-background course is the best!',
                body: 'we are delighted to announce we won the price for best Full-Stack course on plant earth',
                isRead: true,
                isStarred: false,
                sentAt: 1551133345734,
                removedAt: null,
                from: 'coding@academy.com',
                to: 'ordoga@gmail.com'
            },
            {
                _id: 'e3', 
                subject: 'Job Offer from: Apple',
                body: 'Full-Stack junior developer job position has opened - reply this email with your CV',
                isRead: true,
                isStarred: true,
                sentAt: 15511339238024,
                removedAt: null,
                from: 'apple@apple.com',
                to: 'ordoga@gmail.com'
            },
            {
                _id: 'e4', 
                subject: 'Job Offer from: Google',
                body: 'Apple job offer sucks! come work with us <3',
                isRead: true,
                isStarred: true,
                sentAt: 1551133000000,
                removedAt: null,
                from: 'google@gmail.com',
                to: 'ordoga@gmail.com'
            }
        ]
        utilService.saveToStorage(STORAGE_KEY,emails)
    }
}

