import { useEffect, useState } from "react"

import { Sidebar } from "./SideBar"
import { EmailIndex } from "../pages/EmailIndex"
import { EmailFilter } from "./EmailFilter"

import { emailService } from "../services/email.service"


export function MailBox({ textToFilterBy }) {

    const [filterBy, setFilterBy] = useState(textToFilterBy ? {...emailService.getDefaultFilter(), txt: textToFilterBy} : emailService.getDefaultFilter())

    // todo: Add other Filters instead of default

    useEffect(() => {
        setFilterBy({...filterBy, txt:textToFilterBy})
    }, [textToFilterBy])

    return (
        <>
            {/* // TODO : Check if all props are nessesary */}

            <EmailFilter  filterBy={filterBy} setFilterBy={setFilterBy} />

            <Sidebar filterBy={filterBy} setFilterBy={setFilterBy} />

            <EmailIndex filterBy={filterBy} setFilterBy={setFilterBy} />
        </>
    )
}