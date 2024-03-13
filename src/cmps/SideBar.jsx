import { RiInboxFill } from "react-icons/ri";
import { IoMdStarOutline } from "react-icons/io";
import { FaRegTrashAlt } from "react-icons/fa";
import { RxPaperPlane } from "react-icons/rx";
import { BiFileBlank } from "react-icons/bi";


import React, {useEffect, useState} from 'react'
import { Link, NavLink } from 'react-router-dom'

export function Sidebar({ filterBy, onSetFilter, unreadCount }) {

    // Get current folder from EmailIndex filterBy current State
    

    // TODO - useless state
    const [currentFolder, setCurrentFolder] = useState(filterBy)
    
    // On every folder click, update folder state
    function handleFolderClick(newStatus){
        const status = {status:newStatus}
        setCurrentFolder((prevFolder) => ( status ))
        console.log(currentFolder)
    }
    
    
    // On every update of folder state, change EmailIndex Filter
    useEffect(() => {
        onSetFilter(currentFolder)
    },[currentFolder])



    function onComposeClick () {
        console.log("Compose Now")
    }

    return (
        <>
            <div className="sidebar-container">
                <div className="logo-section">
                    
                </div>
                <button className="compose-button" onClick={onComposeClick}>
                    Compose
                </button>  

                {/* // TODO change to filter in EmailIndex by folder in params */}

                <div className="sidebar-content">
                    <ul>
                        <Link to="/inbox" onClick={() => handleFolderClick('inbox')}>
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
                        <Link to="/star" onClick={() => handleFolderClick('star')}>
                            <div className={`folder-container ${filterBy.status==='star'?'active':''}`}>
                                <li>
                                    <IoMdStarOutline className="sidebar-icon" size={20} />
                                    <div className="inbox-text">
                                        <div>Starred</div>
                                    </div>

                                </li>
                            </div>
                        </Link>
                        <Link to="/trash" onClick={() => handleFolderClick('trash')}>
                            <div className={`folder-container ${filterBy.status==='trash'?'active':''}`}>    
                                <li>
                                    <FaRegTrashAlt className="sidebar-icon" size={20}/>
                                    <div className="trash-text">
                                        <div>Trash</div>
                                    </div>
                                </li>
                            </div>
                        </Link>
                        <Link to="/sent" onClick={() => handleFolderClick('sent')}>
                            <div className={`folder-container ${filterBy.status==='sent'?'active':''}`}>    
                                <li>
                                    <RxPaperPlane className="sidebar-icon" size={20}/>
                                    <div className="sent-text">
                                        <div>Sent</div>
                                    </div>

                                </li>
                            </div>
                        </Link>
                        <Link to="/sent" onClick={() => handleFolderClick('draft')}>
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
