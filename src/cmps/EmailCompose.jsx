import { useEffect , useState} from "react"
import { emailService } from "../services/email.service"

export function EmailCompose({searchParams, exitCompose, emailId}){

    const [email,setEmail] = useState(emailId? loadEmail(emailId) : emailService.createEmail())

    useEffect(() => {
        saveToDatabase(email)
    }, [email])

    async function saveToDatabase(email){
        const updatedEmail = await emailService.save(email)
        // If current email does not have an Id, setEmail to the new Email from database
        if(!email.id){
            setEmail(updatedEmail)
        }
    }

    function onSaveDraft(event){
        switch(event.target.name){
            case('to'):
                setEmail((prevEmail) => ({...prevEmail, to:event.target.value}))
                break;
            case('subject'):
                setEmail((prevEmail) => ({...prevEmail, subject:event.target.value}))
                break;
            case('email-body'):
                setEmail((prevEmail) => ({...prevEmail, body:event.target.value}))
                break;
        }
    }
    
    // TODO : update to actually load it
    function loadEmail(emailId){
        return emailService.getById(emailId)
    }

    function onExitCompose(){
        exitCompose()
    }

    function onSendEmail(){
        const newEmail = {...email, sentAt:Date.now()}
        saveToDatabase(newEmail)
        exitCompose()
    }

    return (
        <>
            <div className="email-compose-window">
                <form>

                    <label htmlFor="to">To: </label>
                    <input onChange={onSaveDraft} name="to" id="to" className="to" />

                    <label htmlFor="subject">Subject: </label>
                    <input onChange={onSaveDraft} name="subject" id="subject" className="subject" />

                    <label htmlFor="email-body">Body: </label>
                    <input onChange={onSaveDraft} name="email-body" id="email-body" className="email-body" />
                </form>

                <button onClick={onExitCompose}>X</button>
                <button onClick={onSendEmail}>Send</button>
            </div>
        </>
    )
}  