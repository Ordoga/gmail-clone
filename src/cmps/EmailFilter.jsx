import React, {useEffect, useState} from 'react'
import { emailService } from '../services/email.service'



export function EmailFilter({ filterBy, setFilterBy} ){

    const [filterByToEdit, setFilterByToEdit] = useState(filterBy? filterBy : emailService.getDefaultFilter())


    function handleOnChange(ev){
        const text = ev.target.value
        setFilterBy(() => ({...filterBy, txt:text}))
    }

    function handleOnSubmit(ev){
        ev.preventDefault()
        console.log(ev)
    }




    return (
        <>
            <div className="email-filter">
                <div className='search-field'>
                    <form onSubmit={handleOnSubmit}>
                        <input type="text" name="text-to-search" onChange={handleOnChange} placeholder='Search Emails'/>
                    </form>
                </div>
                <div className="sorting"></div>
            </div>
        </>

    )
    

}