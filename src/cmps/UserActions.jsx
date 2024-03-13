import { IoMailUnreadOutline } from "react-icons/io5";
import { IoMailOpenOutline } from "react-icons/io5";
import { FaRegTrashAlt } from "react-icons/fa";




export function UserActions({email, removeEmail, toggleRead}){

    return (
        <div className="user-actions">
            <div onClick={() => removeEmail(email.id)} className="trash-container action-container">
                <FaRegTrashAlt size={25}/>
                {/* <img className="trash" src={"https://upload.wikimedia.org/wikipedia/commons/7/7d/Trash_font_awesome.svg"}></img> */}
            </div>
            <div onClick={() => toggleRead(email.id)} className="toggle-read-container action-container">
                {email.isRead? <IoMailUnreadOutline size={30} /> : <IoMailOpenOutline size={30}/>}
                {/* <img className="toggle-read" src={email.isRead? "https://upload.wikimedia.org/wikipedia/commons/1/16/Ionicons_mail-unread.svg" : "https://upload.wikimedia.org/wikipedia/commons/1/1b/Ionicons_mail-open-sharp.svg" }></img> */}
            </div>
        </div>
    )
}