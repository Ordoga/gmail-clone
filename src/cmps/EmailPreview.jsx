import { utilService } from "../services/util.service"
import { Link } from "react-router-dom"
import { useEffect } from "react"


export function EmailPreview({ email }) {

    useEffect(() => {
        console.log(email)

    }, [])


    return (
        <>

            <Link className="email-preview" to={`/${email._id}`}>

                <div className="left-icons">                           
                    <div className="star"></div>
                </div>

                <div className="sender">
                        {email.from}
                </div>

                <div className="subject-body">
                    <div className="subject">{email.subject}</div>
                    <div>&nbsp;-&nbsp;</div>
                    <div className="body">{email.body}</div>
                </div>

                <div className="date">{utilService.formatDate(email.sentAt)}</div>
            </Link>
        </>
    )
}