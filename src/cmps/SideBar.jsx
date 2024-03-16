import { RiInboxFill } from "react-icons/ri";
import { IoMdStarOutline } from "react-icons/io";
import { FaRegTrashAlt } from "react-icons/fa";
import { RxPaperPlane } from "react-icons/rx";
import { BiFileBlank } from "react-icons/bi";
import { RiPencilLine } from "react-icons/ri";

import { Link } from 'react-router-dom';
import Logo from '/gmail-logo.png';

export function Sidebar({ filterBy, unreadCount, composeEmail }) {

    function onComposeClick () {
        composeEmail()
    }

    return (
        <>
            <div className="sidebar-container">
                <div className="logo-section">
                    <img height="50px" src={Logo}></img>
                </div>
                
                <button className="compose-button" onClick={onComposeClick}>
                    <div className="pencil">
                        <RiPencilLine size={25}/>
                    </div>
                    <div className="compose-text">
                        Compose
                    </div>
                </button>  

                <div className="sidebar-content">
                    <ul>
                        <Link to="/inbox">
                            <div className={`folder-container ${filterBy.status==='inbox'?'active':''}`}>
                                <li>
                                    <RiInboxFill className="sidebar-icon" size={20} />
                                    <div className="inbox-text">
                                        <div>Inbox</div>
                                        <div className="count">
                                            {(unreadCount>0)? unreadCount : ""}
                                        </div>
                                    </div>
                                </li>    
                            </div>
                        </Link>
                        <Link to="/star">
                            <div className={`folder-container ${filterBy.status==='star'?'active':''}`}>
                                <li>
                                    <IoMdStarOutline className="sidebar-icon" size={20} />
                                    <div className="inbox-text">
                                        <div>Starred</div>
                                    </div>

                                </li>
                            </div>
                        </Link>
                        <Link to="/trash">
                            <div className={`folder-container ${filterBy.status==='trash'?'active':''}`}>    
                                <li>
                                    <FaRegTrashAlt className="sidebar-icon" size={20}/>
                                    <div className="trash-text">
                                        <div>Trash</div>
                                    </div>
                                </li>
                            </div>
                        </Link>
                        <Link to="/sent">
                            <div className={`folder-container ${filterBy.status==='sent'?'active':''}`}>    
                                <li>
                                    <RxPaperPlane className="sidebar-icon" size={20}/>
                                    <div className="sent-text">
                                        <div>Sent</div>
                                    </div>

                                </li>
                            </div>
                        </Link>
                        <Link to="/draft">
                            <div className={`folder-container ${filterBy.status==='draft'?'active':''}`}>    
                                <li>
                                    <BiFileBlank className="sidebar-icon" size={20}/>
                                    <div className="draft-text">
                                        <div>Drafts</div>
                                    </div>
                                </li>
                            </div>
                        </Link>
                    </ul>
                </div>
            </div>
        </>
    )
}
