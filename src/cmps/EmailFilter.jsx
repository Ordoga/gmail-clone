    import { FaArrowDown } from "react-icons/fa";
import { FaArrowUp } from "react-icons/fa";
import { HiMagnifyingGlass } from "react-icons/hi2";


import React, {useEffect, useState} from 'react'
import { emailService } from '../services/email.service'


export function EmailFilter({ filterBy, sortBy, onSetFilter, onSetSort} ){

    const [filterByToEdit, setFilterByToEdit] = useState(filterBy? filterBy : emailService.getDefaultFilter())
    const [sortByToEdit, setSortByToEdit] = useState(sortBy? sortBy : emailService.getDefaultSort())


    // Everytime the filter changes, update on EmailIndex
    useEffect(() => {
        onSetFilter(filterByToEdit)
    }, [filterByToEdit])


    useEffect(() => {
        onSetSort(sortByToEdit)
    }, [sortByToEdit])

    // Everytime the input changes, change the corresponding field in filterByToEdit -> then renders again and apply UseEffect
    function handleOnFilterChange(ev){
        const  {name : field, value } = ev.target
        setFilterByToEdit((prevFilter) => ({...prevFilter, [field]:value }))
    }

    function handleOnSortChange(ev, target){
        if(target) {
            setSortByToEdit((prevFilter) => ({...prevFilter, sort:target}))
        }else{
            const  {name : field, value } = ev.target
            setSortByToEdit((prevFilter) => ({...prevFilter, [field]:value }))
        }
    }

    // Prevent deep refresh
    function handleOnSubmit(ev){
        ev.preventDefault()
    }

    return (
        <>
            <div className="email-filter">
                <form className="filter-form" onSubmit={handleOnSubmit}>
                    <div className='search-field'>
                        <input type="text" name="txt" value={filterBy.txt} onChange={handleOnFilterChange} placeholder='Search Emails'/>
                    </div>

                    <div className="filter-sort-field">
                        <label htmlFor="isRead">Show: </label>
                        <select id="isRead" className="isRead" type="isRead" name="isRead" value={filterBy.isRead} onChange={handleOnFilterChange} placeholder='undifined'>
                            <option value="undifined">All</option>
                            <option value="True">Read</option>
                            <option value="False">Unread</option>
                        </select>

                        <label htmlFor="sortType">Sort by: </label>
                        <select id="sortType" className="sortType" type="sortType" name="sortType" value={sortBy.sortType} onChange={handleOnSortChange} placeholder='date'>
                            <option value="date">Date</option>
                            <option value="subject">Subject</option>
                        </select>

                        <button onClick={(event) => handleOnSortChange(event, sortBy.sort === 'ascending' ? 'descending' : 'ascending')}>
                            <div className="arrow">
                                {sortBy.sort === 'ascending' ?  <FaArrowUp /> : <FaArrowDown /> }
                            </div>
                            <div className="text">
                                {sortBy.sort === 'ascending' ? 'Ascending' : 'Descending'}
                            </div>
                        </button>

                    </div>
                </form>
            </div>
        </>
    )
}
