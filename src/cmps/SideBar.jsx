import React, {useEffect, useState} from 'react'




export function Sidebar({ filterBy, setFilterBy }) {


    function handleInboxClicked(){
        setFilterBy(prevFilter => ( {...filterBy, status:'inbox'} ))
    }
    
    function handleStarredClicked(){
        setFilterBy(prevFilter => ( {...filterBy, status:'star'} ))
    }
    
    function handleTrashClicked(){
        setFilterBy(prevFilter => ( {...filterBy, status:'trash'} ))
    }
    
    function handleSentClicked(){
        setFilterBy(prevFilter => ( {...filterBy, status:'sent'} ))
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
