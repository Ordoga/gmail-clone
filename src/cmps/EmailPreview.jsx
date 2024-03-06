import { utilService } from "../services/util.service"
import { Link } from "react-router-dom"
import { useEffect } from "react"


export function EmailPreview({ email }) {

    useEffect(() => {

    }, [])


    return (
        <>
            <Link className="email-preview" to={`/${email._id}`}>
                {/* Select, Star icons - Column 1 */}
                <div className="left-icons">                           
                    <div className="star"></div>
                </div>
                {/* Column 2 */}
                <div className="sender">
                        {email.from}
                </div>
                {/* Column 3 */}
                <div className="subject-body">
                    <div className="subject">{email.subject}</div>
                    <div>&nbsp;-&nbsp;</div>
                    <div className="body">{email.body}</div>
                </div>
                {/* Column 4 */}
                <div className="date">{utilService.formatDate(email.sentAt)}</div>
            </Link>
        </>
    )
}