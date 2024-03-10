import React, {useEffect, useState} from 'react'
import { NavLink } from 'react-router-dom'

export function Sidebar({ filterBy, onSetFilter }) {

    // Get current folder from EmailIndex filterBy current State
    
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
                <div className="sidebar-content">
                    <li><a onClick={() => handleFolderClick('inbox')}>Inbox</a></li>
                    <li><a onClick={() => handleFolderClick('star')}>Starred</a></li>
                    <li><a onClick={() => handleFolderClick('trash')}>Trash</a></li>
                    <li><a onClick={() => handleFolderClick('sent')}>Sent</a></li>
                </div>
            </div>
        </>
    )
}
