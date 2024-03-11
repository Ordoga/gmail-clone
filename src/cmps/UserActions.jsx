export function UserActions({email, removeEmail, toggleRead}){

    return (
        <div className="user-actions">
            <div onClick={() => removeEmail(email.id)} className="trash-container action-container">
                <img className="trash" src={"https://upload.wikimedia.org/wikipedia/commons/7/7d/Trash_font_awesome.svg"}></img>
            </div>
            <div onClick={() => toggleRead(email.id)} className="toggle-read-container action-container">
                <img className="toggle-read" src={email.isRead? "https://upload.wikimedia.org/wikipedia/commons/1/16/Ionicons_mail-unread.svg" : "https://upload.wikimedia.org/wikipedia/commons/1/1b/Ionicons_mail-open-sharp.svg" }></img>
            </div>
        {/* <button onClick={() => toggleRead(email.id)}>read</button> */}
        </div>
    )
}