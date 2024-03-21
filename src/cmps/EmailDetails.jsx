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
                <div className="email-details-actions">Actions Line</div>
                <div className="email-details-subject">
                    <h1>{email.subject}</h1>
                </div>
                <div className="email-details-from">
                    <h4>{`<${email.from}>`}</h4>
                </div>
                <div className="email-details body">
                    <p>{email.body}</p>
                </div>
                <button onClick={() => onRemoveItem(email)}>{email.removedAt? `Delete Permenantely` : `Move To Trash`}</button>
                {!email.sentAt && <button onClick={() => onEditDraft(email.id)}>Edit Draft</button>}
                <Link to={`/${params.folder}`}><h1>{'<- Go Back'}</h1></Link>
            </section>
        </>
    )
}