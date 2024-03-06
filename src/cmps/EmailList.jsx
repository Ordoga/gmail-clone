import { useEffect } from "react"
import { EmailPreview } from "./EmailPreview"
import { EmailFilter } from "./EmailFilter"
export function EmailList({emails}) {



    useEffect(() => {
        console.log(emails)
    }, [])

    if(!emails){
        return null
    }

    return (
        <>
            <ul className="email-list">
            <div className="sorting"></div>
                    {

                        emails.map(email =>
                            <li key={email._id}>
                                <EmailPreview email={email}/>
                            </li>
                        )
                    }
                    <div className="list-end"></div>
            </ul>
        </>
    )
}