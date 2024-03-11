import { utilService } from "../services/util.service"
import { Link } from "react-router-dom"
import { useState, useEffect } from "react"

import { UserActions } from "./UserActions"

export function EmailPreview({ email, toggleStar, removeEmail, toggleRead}) {

    const [isHoveredActive,setIsHoverActive] = useState(false)

    useEffect(() => {
    }, [isHoveredActive])

    function onHover(){
        setIsHoverActive(true)
    }

    function onHoverFinish(){
        setIsHoverActive(false)
    }

    function onStarClick(emailId){
        toggleStar(emailId)
    }

    return (
        <>
            <div onMouseEnter={onHover} onMouseLeave={onHoverFinish} className={"email-preview " + (!email.isRead && 'unread' )} to={`/${email.id}`}>
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
                </div>
                
                {/* Column 4 */}
                {isHoveredActive? <UserActions email={email} removeEmail={removeEmail} toggleRead={toggleRead} /> : <div className="date">{utilService.formatDate(email.sentAt)}</div>}
            </div>
        </>
    )
}