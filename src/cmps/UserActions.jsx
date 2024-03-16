import { IoMailUnreadOutline } from "react-icons/io5";
import { IoMailOpenOutline } from "react-icons/io5";
import { FaRegTrashAlt } from "react-icons/fa";

export function UserActions({email, removeEmail, toggleRead}){

    return (
        <div className="user-actions">
            <div onClick={() => removeEmail(email.id)} className="trash-container action-container">
                <FaRegTrashAlt size={25}/>
            </div>
            <div onClick={() => toggleRead(email.id)} className="toggle-read-container action-container">
                {email.isRead? <IoMailUnreadOutline size={30} /> : <IoMailOpenOutline size={30}/>}
            </div>
        </div>
    )
}