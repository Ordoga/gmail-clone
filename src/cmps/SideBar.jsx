import React, {useEffect, useState} from 'react'


export function Sidebar({ filterBy, onSetFilter }) {

    const [currentFolder, setCurrentFolder] = useState(filterBy)
    useEffect(() => {
        console.log(filterBy)
        onSetFilter(currentFolder)
    },[currentFolder])



    function handleFolderClick(newStatus){
        const status = {status:newStatus}
        setCurrentFolder((prevFolder) => ( status ))
    }


    return (
        <>
            <div className="sidebar-container">
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
