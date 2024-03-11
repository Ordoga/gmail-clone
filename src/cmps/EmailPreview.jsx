import { utilService } from "../services/util.service"
import { Link } from "react-router-dom"
import { useEffect } from "react"


export function EmailPreview({ email, toggleStar }) {

    useEffect(() => {

    }, [])

    function onStarClick(emailId){
        toggleStar(emailId)
    }

    return (
        <>
            <div className="email-preview" to={`/${email.id}`}>
                {/* Select, Star icons - Column 1 */} 
                <div className="left-icons">
                    <div onClick={() => onStarClick(email.id)} className="star-container">
                        <img className="star" src={email.isStarred? "https://upload.wikimedia.org/wikipedia/commons/3/30/Star-full.png" : "https://upload.wikimedia.org/wikipedia/commons/7/7a/Star-empty.png"}></img>
                    </div>
                </div>

                {/* Column 2 */}
                <div className="sender">
                        {email.from}
                </div>

                {/* Column 3 */}
                <div className="subject-body">
                    <Link to={`/${email.id}`} className="subject">{email.subject} - {email.body}</Link>
                    {/* <div>&nbsp;-&nbsp;</div>
                    <div className="body">{email.body}</div> */}
                </div>
                
                {/* Column 4 */}
                <div className="date">{utilService.formatDate(email.sentAt)}</div>
            </div>
        </>
    )
}