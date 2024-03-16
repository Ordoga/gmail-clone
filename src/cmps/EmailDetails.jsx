import { useEffect, useState } from "react"
import { useParams } from "react-router"
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import { emailService } from "../services/email.service"


export function EmailDetails(){

    const [email, setEmail] = useState(null)
    
    const params = useParams()
    
    const navigate = useNavigate()

    const { removeEmail, markRead , onEditDraft} = useOutletContext()

    useEffect(() => {
        loadEmail()
    }, [params.emailId])

    async function loadEmail() {
        try{
            const emailDetail = await emailService.getById(params.emailId)
            markRead(emailDetail.id)
            setEmail(emailDetail)
        } catch(err) {
            console.log(`Error: `. err)
        }
    }

    function onRemoveItem(emailToRemove) {
        removeEmail(emailToRemove.id)
        navigate(`/${params.folder}`)
    }

    if (!email) return <></>
    
    return (
        <>
            <section className="email-details">
                <Link to={`/${params.folder}`}><h1>{'<- Back'}</h1></Link>
                <h1>{email.subject}</h1>
                <h4>From: {email.from}</h4>
                <h4>To: {email.to}</h4>
                <p>{email.body}</p>
                <button onClick={() => onRemoveItem(email)}>{email.removedAt? `Delete Permenantely` : `Move To Trash`}</button>
                {!email.sentAt && <button onClick={() => onEditDraft(email.id)}>Edit Draft</button>}
            </section>
        </>
    )
}