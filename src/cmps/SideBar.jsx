import React, {useEffect, useState} from 'react'


export function Sidebar({ filterBy, setFilterBy }) {


    function handleInboxClicked(){
        setFilterBy(() => ( {...filterBy, status:'inbox'} ))
    }
    
    function handleStarredClicked(){
        setFilterBy(() => ( {...filterBy, status:'star'} ))
    }
    
    function handleTrashClicked(){
        setFilterBy(() => ( {...filterBy, status:'trash'} ))
    }
    
    function handleSentClicked(){
        setFilterBy(() => ( {...filterBy, status:'sent'} ))
    }


    return (
        <>
            <div className="sidebar-container">
                <div className="sidebar-content">
                    <li><a onClick={handleInboxClicked}>Inbox</a></li>
                    <li><a onClick={handleStarredClicked}>Starred</a></li>
                    <li><a onClick={handleTrashClicked}>Trash</a></li>
                    <li><a onClick={handleSentClicked}>Sent</a></li>
                </div>
            </div>
        </>
    )
}
