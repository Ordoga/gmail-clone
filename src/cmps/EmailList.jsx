import { EmailPreview } from "./EmailPreview"

export function EmailList({emails}) {





    if(!emails){
        return null
    }

    return (
        <>
            <ul className="email-list">
                {
                    emails.map(email =>
                        <li>
                            <EmailPreview email={email}/>
                        </li>
                    )
                }
            </ul>
        </>
    )
}