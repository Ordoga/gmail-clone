import { useEffect, useState } from "react"

import { Sidebar } from "./SideBar"
import { EmailIndex } from "../pages/EmailIndex"

import { emailService } from "../services/email.service"


export function MailBox({ textToFilterBy }) {

    const [filterBy, setFilterBy] = useState(textToFilterBy)

    // todo: Add other Filters instead of default

    useEffect(() => {
        setFilterBy({...emailService.getDefaultFilter(), txt:textToFilterBy})
    }, [textToFilterBy])

    return (
        <>
            <Sidebar/>
            {console.log(`From MailBox: ${textToFilterBy}`)}
            <EmailIndex filterByTxt={filterBy} />
        </>
    )
}