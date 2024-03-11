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
                    <li><Link to="/inbox" onClick={() => handleFolderClick('inbox')}>{(unreadCount>0)? "Inbox " + unreadCount : "Inbox"}</Link></li>
                    <li><Link to="/star" onClick={() => handleFolderClick('star')}>Starred</Link></li>
                    <li><Link to="/trash" onClick={() => handleFolderClick('trash')}>Trash</Link></li>
                    <li><Link to="/sent" onClick={() => handleFolderClick('sent')}>Sent</Link></li>
                </div>
            </div>
        </>
    )
}
