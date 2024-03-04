

export function EmailPreview({ email }) {
    return (
        <div className="email-preview">

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

            <div className="date">{email.sentAt}</div>
            
        </div>
    )
}