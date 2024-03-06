import { useEffect, useState } from "react"
import { useParams } from "react-router"

import { emailService } from "../services/email.service"


export function EmailDetails(){

    const [email, setEmail] = useState(null)
    const params = useParams()

    useEffect(() => {
        console.log(`before load Email`, email)
        loadEmail()
        console.log(`after load Email`, email)
    }, [params.emailId])

    async function loadEmail() {
        try{
            const emailDetail = await emailService.getById(params.emailId)
            setEmail(emailDetail)
        } catch(err) {
            console.log(`Error: `. err)
        }
    }

    if (!email) {
        console.log(`No Emails`)
        return
    }
    return (
        <>
            <section className="email-details">
                <h1>{email.subject}</h1>
                <h4>From: {email.from}</h4>
                <h4>To: {email.to}</h4>
                <p>{email.body}</p>
            </section>
        </>
    )
}