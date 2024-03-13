import React, {useEffect, useState} from 'react'
import { emailService } from '../services/email.service'



export function EmailFilter({ filterBy, onSetFilter} ){

    const [filterByToEdit, setFilterByToEdit] = useState(filterBy? filterBy : emailService.getDefaultFilter())


    // Everytime the filter changes, update on EmailIndex
    useEffect(() => {
        onSetFilter(filterByToEdit)
    }, [filterByToEdit])

    // Everytime the input changes, change the corresponding field in filterByToEdit -> then renders again and apply UseEffect
    function handleOnChange(ev){
        const  {name : field, value } = ev.target
        setFilterByToEdit((prevFilter) => ({...prevFilter, [field]:value }))
    }

    // Prevent deep refresh
    function handleOnSubmit(ev){
        ev.preventDefault()
    }

    return (
        <>
            <div className="email-filter">
                <div className='search-field'>
                    <form onSubmit={handleOnSubmit}>
                        <input type="text" name="txt" value={filterBy.txt} onChange={handleOnChange} placeholder='Search Emails'/>
                        <select className="is-read" type="isRead" name="isRead" value={filterBy.isRead} onChange={handleOnChange} placeholder='undifined'>
                            <option value="undifined">All</option>
                            <option value="True">Read</option>
                            <option value="False">Unread</option>
                        </select>
                    </form>
                </div>
            </div>
        </>
    )
}