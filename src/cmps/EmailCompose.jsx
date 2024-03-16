import { useEffect , useState} from "react"
import { emailService } from "../services/email.service"

export function EmailCompose({searchParams, exitCompose}){

    const [email,setEmail] = useState(null)

    useEffect(() => {
        async function loadEmail(){
            if(searchParams.get('compose') === 'new'){
                setEmail(emailService.createEmail())
            }else{
                const emailToEdit = await emailService.getById(searchParams.get('compose'))
                setEmail(emailToEdit)
            }
        }
        loadEmail()
    }, [])
    
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

    // Saves all the time, need to re-design
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

    function onExitCompose(){
        exitCompose()
    }

    function onSendEmail(){
        const newEmail = {...email, sentAt:Date.now()}
        saveToDatabase(newEmail)
        exitCompose()
    }

    if(!email) return <></>
    return (
        <>
            <div className="email-compose-window">
                <div className="new-message-title">
                    New Message
                    <button class="exit-compose-btn" onClick={onExitCompose}>X</button>
                </div>
                
                <form>

                    <div className="compose-body">
                        <div className="to-line compose-line-container">
                            <label htmlFor="to">To: </label>
                            <input onChange={onSaveDraft} name="to" id="to" className="to compose-input" value={email.to}/>
                        </div>

                        <div className="subject-line compose-line-container">
                            <label htmlFor="subject">Subject: </label>
                            <input onChange={onSaveDraft} name="subject" id="subject" className="subject compose-input" value={email.subject}/>
                        </div>

                        <div className="body-area">
                            {/* <label htmlFor="email-body">Body: </label> */}
                            <textarea onChange={onSaveDraft} name="email-body" id="email-body" className="email-body" value={email.body}/>
                        </div>
                    </div>
                </form>

                <div className="send-btn-container">
                    <button className="send-email-btn" onClick={onSendEmail}>Send</button>
                </div>
            </div>
        </>
    )
}  